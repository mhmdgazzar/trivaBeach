import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import cors from 'cors';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: ['https://trivabeach.gazzar.de', 'http://localhost:4321'],
    methods: ['GET', 'POST'],
}));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'beach-finder-api' });
});

// MCP Client singleton
let mcpClient = null;

async function getMcpClient() {
    if (mcpClient) return mcpClient;

    const transport = new StreamableHTTPClientTransport(
        new URL('https://mcp.trivago.com/mcp')
    );

    mcpClient = new Client({
        name: 'beach-finder-api',
        version: '1.0.0',
    });

    await mcpClient.connect(transport);
    console.log('Connected to Trivago MCP');
    return mcpClient;
}

// Parse hotel data from various response formats
function parseHotelData(responseText) {
    // Try to extract JSON array from the response
    // The response might be: map[output:[{...}] system_message:...]
    // Or it might be a plain JSON array

    // First, try direct JSON parse
    try {
        const parsed = JSON.parse(responseText);
        if (Array.isArray(parsed)) {
            return parsed;
        }
        if (parsed.output && Array.isArray(parsed.output)) {
            return parsed.output;
        }
    } catch (e) {
        // Not valid JSON, try to extract array
    }

    // Try to extract JSON array using regex
    const arrayMatch = responseText.match(/\[\s*\{[\s\S]*?\}\s*\]/);
    if (arrayMatch) {
        try {
            return JSON.parse(arrayMatch[0]);
        } catch (e) {
            console.log('Failed to parse extracted array');
        }
    }

    // Try to find individual hotel objects
    const hotelMatches = responseText.match(/\{[^{}]*"Accommodation Name"[^{}]*\}/g);
    if (hotelMatches && hotelMatches.length > 0) {
        const hotels = [];
        for (const match of hotelMatches) {
            try {
                hotels.push(JSON.parse(match));
            } catch (e) {
                // Skip invalid entries
            }
        }
        if (hotels.length > 0) return hotels;
    }

    return [];
}

// Hotels endpoint - calls Trivago MCP radius search
app.post('/hotels', async (req, res) => {
    try {
        const { lat, lng, arrival, departure, adults = 2, rooms = 1 } = req.body;

        if (!lat || !lng || !arrival || !departure) {
            return res.status(400).json({
                error: 'Missing required fields: lat, lng, arrival, departure'
            });
        }

        console.log(`Searching hotels near ${lat}, ${lng} for ${arrival} to ${departure}`);

        const client = await getMcpClient();

        // Call trivago-accommodation-radius-search tool
        const result = await client.callTool({
            name: 'trivago-accommodation-radius-search',
            arguments: {
                lat: parseFloat(lat),
                lng: parseFloat(lng),
                radius: 50, // 50km radius from beach
                arrival,
                departure,
                adults: parseInt(adults),
                rooms: parseInt(rooms),
            },
        });

        console.log('MCP Result content type:', result.content?.[0]?.type);

        // Parse the response
        const content = result.content?.[0];
        if (content?.type === 'text') {
            const responseText = content.text;
            console.log('Response length:', responseText?.length);

            const hotels = parseHotelData(responseText);
            console.log('Parsed hotels count:', hotels.length);

            if (hotels.length > 0) {
                // Format response
                const formattedHotels = hotels.slice(0, 2).map(hotel => ({
                    name: hotel['Accommodation Name'] || hotel.name || 'Unknown Hotel',
                    rating: hotel['Review Rating'] || hotel.rating || 'N/A',
                    stars: parseInt(hotel['Hotel Rating']) || hotel.stars || 0,
                    pricePerNight: hotel['Price Per Night'] || hotel.price || 'N/A',
                    pricePerStay: hotel['Price Per Stay'] || '',
                    url: hotel['Accommodation URL'] || hotel.url || '',
                    amenities: hotel['Top Amenities'] || '',
                    image: hotel['Main Image'] || '',
                }));

                console.log('Returning hotels:', formattedHotels.map(h => h.name));
                return res.json(formattedHotels);
            }
        }

        console.log('No hotels found in response');
        return res.json([]);
    } catch (error) {
        console.error('Error fetching hotels:', error.message);
        res.status(500).json({
            error: 'Failed to fetch hotels',
            message: error.message
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Beach Finder API running on port ${PORT}`);
    console.log(`CORS enabled for: https://trivabeach.gazzar.de`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('Shutting down...');
    if (mcpClient) {
        await mcpClient.close();
    }
    process.exit(0);
});

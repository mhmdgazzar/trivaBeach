# Trivago MCP Server Guide

## Overview

This workspace is configured with the **Trivago MCP (Model Context Protocol) Server**, which provides access to Trivago's accommodation search functionality. This allows you to search for hotels, accommodations, and travel information directly through an AI assistant interface.

## Server Configuration

The MCP server is configured in `.vscode/mcp.json`:

```json
{
	"servers": {
		"mcp_trivago_search": {
			"type": "http",
			"url": "https://mcp.trivago.com/mcp"
		}
	},
	"inputs": []
}
```

**Server Details:**
- **Name:** mcp_trivago_search
- **Type:** HTTP
- **Endpoint:** https://mcp.trivago.com/mcp

## Available Tools

The Trivago MCP server provides the following tools:

### 1. Search Suggestions
**Function:** `trivago-search-suggestions`

Get location suggestions based on a search query.

**Parameters:**
- `query` (string, required): City, country, or location name

**Example Usage:**
```
Query: "Berlin"
Returns: Suggestions for Berlin (city, regions, districts, landmarks)
```

**Response includes:**
- Location ID and NS (namespace)
- Location type (City, Region, Subregion, Districts, Train station)
- Full location labels

---

### 2. Accommodation Search
**Function:** `trivago-accommodation-search`

Search for accommodations in a specific location.

**Parameters:**
- `id` (number, required): Location ID from suggestions (use "ID" field)
- `ns` (number, required): Namespace from suggestions (use "NS" field)
- `arrival` (string, required): Arrival date in YYYY-MM-DD format
- `departure` (string, required): Departure date in YYYY-MM-DD format
- `adults` (number, required): Number of adults (minimum: 1)
- `children` (number, optional): Number of children (minimum: 0)
- `children_ages` (string, optional): Dash-separated ages (e.g., "5-8-12")
- `rooms` (number, required): Number of rooms (must be ≤ number of adults)

**Filters (optional):**
- `freeWiFi`, `parking`, `breakfast`, `freeCancellation`
- `pool`, `gym`, `spa`, `petFriendly`, `kitchen`, `airConditioning`

**Hotel Rating Filter (optional):**
- `1star`, `2star`, `3star`, `4star`, `5star`

**Review Rating Filter (optional):**
- `rating70`, `rating75`, `rating80`, `rating85`

**Response includes:**
- Accommodation name and ID
- Address and postal code
- Price per night and total stay price
- Hotel rating and guest review rating
- Main image URL
- Top amenities
- Distance to landmarks
- Accommodation URL on Trivago

---

### 3. Accommodation Radius Search
**Function:** `trivago-accommodation-radius-search`

Search for accommodations within a specific radius of coordinates.

**Parameters:**
- `latitude` (number, required): Latitude coordinate
- `longitude` (number, required): Longitude coordinate
- `radius` (number, required): Search radius in meters
- `arrival` (string, required): Arrival date (YYYY-MM-DD)
- `departure` (string, required): Departure date (YYYY-MM-DD)
- `adults` (number, required): Number of adults
- `children` (number, optional): Number of children
- `children_ages` (string, optional): Dash-separated ages
- `rooms` (number, required): Number of rooms

*(Same filters available as accommodation-search)*

---

## Typical Workflow

### Step 1: Get Location Suggestions
```
User: "I want to find a hotel in Paris"
Tool: trivago-search-suggestions
Query: "Paris"
```

### Step 2: Use ID/NS from Suggestions
```
Response provides:
- ID: 123456
- NS: 200
- Location: "Paris, France"
```

### Step 3: Search for Accommodations
```
Tool: trivago-accommodation-search
Parameters:
- id: 123456
- ns: 200
- arrival: "2026-02-20"
- departure: "2026-02-25"
- adults: 2
- rooms: 1
```

### Step 4: Review Results
```
Returns list of hotels with:
- Names and ratings
- Prices and availability
- Amenities and reviews
- Booking links
```

---

## Example Search Queries

### Example 1: Budget Hotel in Berlin
1. Search suggestions: "Berlin"
2. Get ID=3848, NS=200
3. Search accommodations:
   - Arrival: 2026-02-15
   - Departure: 2026-02-20
   - Adults: 2
   - Rooms: 1
4. Filter by: 3-star hotels, 8.0+ reviews, free WiFi

### Example 2: Family Trip to London
1. Search suggestions: "London"
2. Get location ID and NS
3. Search with:
   - Adults: 2
   - Children: 2 (ages: 6-10)
   - Rooms: 2
   - Filters: Pet friendly, pool, gym
   - Dates: 2026-06-01 to 2026-06-08

### Example 3: Luxury Hotel Near Eiffel Tower
1. Use radius search with:
   - Latitude: 48.8584
   - Longitude: 2.2945 (Eiffel Tower coordinates)
   - Radius: 5000 (meters)
   - Filter by: 5-star hotels, 8.5+ reviews

---

## Current Testing Status

✅ **Server Status:** Online and Functional
- Successfully tested location suggestions (Berlin)
- Successfully retrieved 30+ hotel results
- All returned data includes images, prices, reviews, and amenities

---

## Notes for Usage

1. **Date Format:** Always use YYYY-MM-DD format for dates
2. **Current Date:** January 28, 2026
3. **Minimum Stay:** Arrival must be before departure date
4. **Room Limitation:** Number of rooms cannot exceed number of adults
5. **Currency:** Prices returned in local currency (EUR for Europe, etc.)
6. **Image URLs:** All accommodations include main image URLs for display

---

## Troubleshooting

- **No results:** Try broader search criteria or different dates
- **Location not found:** Use major city names; regions/districts may not always return results
- **Filters not matching:** Ensure date range is reasonable and room count ≤ adult count

---

## Integration with AI Assistants

This MCP server integrates seamlessly with AI assistants capable of:
- Reading and following MCP specifications
- Making HTTP requests to the configured endpoint
- Processing JSON responses
- Utilizing the three main tools for hotel searches

To use with an AI assistant, ensure it has access to the `.vscode/mcp.json` configuration file.

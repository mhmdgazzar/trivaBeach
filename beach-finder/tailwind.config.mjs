/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            {
                beachfinder: {
                    "primary": "#0EA5E9",
                    "secondary": "#06B6D4",
                    "accent": "#F59E0B",
                    "neutral": "#1E293B",
                    "base-100": "#0F172A",
                    "base-200": "#1E293B",
                    "base-300": "#334155",
                    "info": "#38BDF8",
                    "success": "#22C55E",
                    "warning": "#FBBF24",
                    "error": "#EF4444",
                },
            },
        ],
    },
}

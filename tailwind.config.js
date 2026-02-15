/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#eef2ff',
                    100: '#e0e7ff',
                    200: '#c7d2fe',
                    300: '#a5b4fc',
                    400: '#818cf8',
                    500: '#6366f1',
                    600: '#4f46e5', // Brand Indigo
                    700: '#4338ca', // Deep Indigo (Primary)
                    800: '#3730a3',
                    900: '#312e81',
                    950: '#1e1b4b',
                },
                secondary: {
                    50: '#fffbeb',
                    100: '#fef3c7',
                    200: '#fde68a',
                    300: '#fcd34d',
                    400: '#fbbf24', // Brand Yellow/Orange
                    500: '#f59e0b', // Action (Secondary)
                    600: '#d97706',
                    700: '#b45309',
                    800: '#92400e',
                    900: '#78350f',
                    950: '#451a03',
                },
                background: {
                    light: '#f8f9fb', // Slightly warmer/cleaner than slate-50
                    DEFAULT: '#ffffff',
                    dark: '#1e293b', // slate-800
                },
                text: {
                    light: '#64748b', // slate-500
                    DEFAULT: '#334155', // slate-700
                    dark: '#0f172a', // slate-900
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
            },
            boxShadow: {
                'soft': '0 2px 10px rgba(0, 0, 0, 0.03)',
                'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
                'premium': '0 8px 24px rgba(0,0,0,0.06)',
            },
            borderRadius: {
                'xl': '0.75rem', // 12px
                '2xl': '1rem',    // 16px - reduced from 1.5rem
                '3xl': '1.5rem',  // 24px
            },
            spacing: {
                '18': '4.5rem',
            }
        },
    },
    plugins: [],
}

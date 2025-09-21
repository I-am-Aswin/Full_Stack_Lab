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
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d6ff',
          300: '#a5b8ff',
          400: '#8190ff',
          500: '#4169e1', // Royal Blue - your requested color
          600: '#3b5cdb',
          700: '#344ed1',
          800: '#2e42c7',
          900: '#2836bd',
          950: '#1a2480',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#4169e1",
          "primary-content": "#ffffff",
          "secondary": "#f0f4ff",
          "secondary-content": "#1a2480",
          "accent": "#3b5cdb",
          "accent-content": "#ffffff",
          "neutral": "#f7f7f7",
          "neutral-content": "#1f2937",
          "base-100": "#ffffff",
          "base-200": "#f8fafc",
          "base-300": "#f1f5f9",
          "base-content": "#1e293b",
          "info": "#3b82f6",
          "success": "#10b981",
          "warning": "#f59e0b",
          "error": "#ef4444",
        },
      },
    ],
    darkTheme: false,
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
}

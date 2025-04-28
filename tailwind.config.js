/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'hsl(var(--color-primary-50, 204deg 100% 97%))',
          100: 'hsl(var(--color-primary-100, 204deg 100% 94%))',
          200: 'hsl(var(--color-primary-200, 203deg 100% 86%))',
          300: 'hsl(var(--color-primary-300, 198deg 93% 74%))',
          400: 'hsl(var(--color-primary-400, 199deg 95% 59%))',
          500: 'hsl(var(--color-primary-500, 199deg 89% 48%))',
          600: 'var(--color-primary-600, #0284c7)',
          700: 'var(--color-primary-700, #0369a1)',
          800: 'hsl(var(--color-primary-800, 201deg 90% 27%))',
          900: 'hsl(var(--color-primary-900, 202deg 80% 24%))',
          950: 'hsl(var(--color-primary-950, 204deg 80% 16%))',
        },
        secondary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Montserrat', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
} 
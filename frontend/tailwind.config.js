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
          50: '#f8f7f4',
          100: '#f0ede8',
          200: '#e1dbd1',
          300: '#d2c9ba',
          400: '#b3a593',
          500: '#9d8b7e',
          600: '#8b7968',
          700: '#6d6250',
          800: '#4f4738',
          900: '#3a3228',
        },
        accent: {
          50: '#fef9f3',
          100: '#fdf3e7',
          200: '#fbe7cf',
          300: '#f9dbb7',
          400: '#f5c37f',
          500: '#f1ab47',
          600: '#e69a2e',
          700: '#d17f1f',
          800: '#b86416',
          900: '#9a4f0f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'soft-xl': '0 8px 24px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {primary: '#ad00ff',
        bg: '#f2f2f2',       // Define the background color
        white: '#ffffff',
      },
    },
  },
  plugins: [],
}
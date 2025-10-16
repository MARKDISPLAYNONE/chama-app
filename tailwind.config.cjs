/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        base: '18px', // Default text size for seniors
        lg: '20px',
        xl: '22px',
        '2xl': '24px',
      },
      colors: {
        primary: '#0F2A4D', // Dark blue (accessible, friendly)
        background: '#FFFFFF', // Pure white background
        text: '#1F2937', // Dark gray (high contrast, easier on eyes than pure black)
        success: '#10B981', // Soft green for success
        button: '#0F2A4D',
      },
      borderRadius: {
        DEFAULT: '12px', // Rounded buttons and inputs
      },
    },
    fontFamily: {
      sans: ['"Nunito Sans"', 'sans-serif'],
    },
  },
  plugins: [],
}
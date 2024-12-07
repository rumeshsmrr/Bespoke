/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFFFFF",
        secondary: {
          100: "#523B2F",
          200: "#EBE2DB",
          // Adding low-opacity versions
          "100-low": "rgba(82, 59, 47, 0.8)", // 50% opacity
          "200-low": "rgba(235, 226, 219, 0.3)", // 30% opacity
        },
        // Example for adding other low-opacity custom colors
        accent: {
          DEFAULT: "#FF5733",
          low: "rgba(255, 87, 51, 0.4)", // 40% opacity
        },
      },
      fontFamily: {
        primaryFont: ["primaryFont", "serif"],
        secondaryFont: ["secondaryFont", "sans-serif"],
      },
    },
  },
  plugins: [],
};

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
        },
      },
      fontFamily: {
        primaryFont: ["primaryFont", "serif"],
      },
    },
  },
  plugins: [],
};

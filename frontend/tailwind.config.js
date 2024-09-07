/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        smallMobile: "330px",
        mobile: "375px",
        largeMobile: "425px",
        smallTablet: "768px",
        largeTablet: "868px",
        smallDekstop: "1024px",
        laptop: "1280px",
        largeDekstop: "1440px",
      },

      fontFamily: {
        sans: ["Public Sans", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};

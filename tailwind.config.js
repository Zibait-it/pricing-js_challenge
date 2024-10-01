/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./css/**/*.css"],
  theme: {
    extend: {
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
        ubuntu: ["Ubuntu", "sans-serif"],
      },
      fontSize: {
        xl: "22px",
      },
      lineHeight: {
        xl: "30px",
      },
      colors: {
        primary: "#FCFCFC",
        yellow: "#CA8A04",
        light_yellow: "#FEF8E7",
        green: "#16A34A",
        light_green: "#F0FAF4",
        red: "#DC2626",
        light_red: "#FDE8E8",
        orange: "#EA580C",
        dark_grey: "#1C202E",
        light_grey: "#90949F",
        dark: "#00000066",
      },
    },
  },
  plugins: [],
};

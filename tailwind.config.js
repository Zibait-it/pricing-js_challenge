/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./css/**/*.css"],
  theme: {
    extend: {
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
        ubuntu: ["Ubuntu", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        xl: "22px",
      },
      lineHeight: {
        xl: "30px",
      },
      colors: {
        primary: "#FCFCFC",
        "primary-transparent": "#FCFCFC4D",
        yellow: "#CA8A04",
        "light-yellow": "#FEF8E7",
        green: "#16A34A",
        "light-green": "#F0FAF4",
        red: "#DC2626",
        "light-red": "#FDE8E8",
        orange: "#EA580C",
        "light-orange": "#ff9539",
        "dark-grey": "#1C202E",
        "light-grey": "#90949F",
        "modal-dark-grey": "#1F2937",
        "modal-light-grey": "#6B7280",
        dark: "#00000066",
      },
    },
  },
  plugins: [],
};

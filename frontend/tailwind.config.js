/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["business", "forest"],
  },
  plugins: ["prettier-plugin-tailwind", require("daisyui")],
};

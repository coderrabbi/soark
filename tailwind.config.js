/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: false,
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};

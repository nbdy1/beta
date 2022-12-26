/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: { colors: { "primary": "#FCC153", "secondary": "#21AF5D" } },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    "justify-start",
    "justify-end",
    "items-start",
    "items-end",
    "bg-blue-400",
    "bg-blue-white",
    "text-white",
    "text-gray-700",
  ],
};

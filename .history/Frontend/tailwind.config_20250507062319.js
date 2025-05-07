import flowbite from "flowbite-react/tailwind";
import { keyframes } from "framer-motion";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        libre: ['"Libre Baskerville"', "serif"],
        lato: ['"Lato"', "sans-serif"],
        Itim: ['"Itim"', "cursive", "sans-serif"],
      },
    },
    @keyframes: {
      "fade-in": {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 },
      },
    }
  },
  // eslint-disable-next-line
  plugins: [require("@tailwindcss/forms"), flowbite.plugin()],
};

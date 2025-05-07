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
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
    },
  },
  // eslint-disable-next-line
  plugins: [require("@tailwindcss/forms"), flowbite.plugin()],
};

import flowbite from "flowbite-react/tailwind";
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
  },
  // eslint-disable-next-line
  plugins: [require("@tailwindcss/forms"), flowbite.plugin()],
};

// import flowbite from "flowbite-react/tailwind";
// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
//   theme: {
//     extend: {
//       fontFamily: {
//         libre: ['"Libre Baskerville"', "serif"],
//         lato: ['"Lato"', "sans-serif"],
//         Itim: ['"Itim"', "cursive", "sans-serif"],
//       },
//     },
//   },
//   // eslint-disable-next-line
//   plugins: [require("@tailwindcss/forms"), flowbite.plugin()],
// };
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
        Inter: ['"Inter"', "sans-serif"],
        Roboto: ['"Roboto"', "sans-serif"],
      },
      screens: {
        "tablet-lg": { min: "768px", max: "1063px" }, // Custom range
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "float-slow": "float-slow 5s ease-in-out infinite",
        "float-reverse": "float 4s ease-in-out infinite reverse",
      },
    },
  },
  plugins: [flowbite.plugin()],
};

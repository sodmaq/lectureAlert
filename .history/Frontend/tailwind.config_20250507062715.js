import flowbite from "flowbite-react/tailwind";
/**  type {import('tailwindcss').Config} */
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
     keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

     keyframes fadeSlideDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

     keyframes fadeSlideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

     keyframes fadeSlideUp-delay-1 {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      70%,
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

     keyframes fadeSlideUp-delay-2 {
      0%,
      20% {
        opacity: 0;
        transform: translateY(20px);
      }
      90%,
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

     keyframes fadeSlideUp-delay-3 {
      0%,
      40% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    keyframes fadeSlideUp-delay-4 {
      0%,
      60% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

     keyframes fadeSlideUp-delay-5 {
      0%,
      80% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

     keyframes fadeSlideUp-delay-6 {
      0%,
      90% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

     keyframes shake {
      0%,
      100% {
        transform: translateX(0);
      }
      20%,
      60% {
        transform: translateX(-5px);
      }
      40%,
      80% {
        transform: translateX(5px);
      }
    }

    .animate-fadeIn {
      animation: fadeIn 0.6s ease-out forwards;
    }

    .animate-fadeSlideDown {
      animation: fadeSlideDown 0.5s ease-out 0.2s forwards;
    }

    .animate-fadeSlideUp {
      animation: fadeSlideUp 0.5s ease-out 0.3s forwards;
    }

    .animate-fadeSlideUp-delay-1 {
      opacity: 0;
      animation: fadeSlideUp-delay-1 0.5s ease-out 0.4s forwards;
    }

    .animate-fadeSlideUp-delay-2 {
      opacity: 0;
      animation: fadeSlideUp-delay-2 0.5s ease-out 0.5s forwards;
    }

    .animate-fadeSlideUp-delay-3 {
      opacity: 0;
      animation: fadeSlideUp-delay-3 0.5s ease-out 0.6s forwards;
    }

    .animate-fadeSlideUp-delay-4 {
      opacity: 0;
      animation: fadeSlideUp-delay-4 0.5s ease-out 0.7s forwards;
    }

    .animate-fadeSlideUp-delay-5 {
      opacity: 0;
      animation: fadeSlideUp-delay-5 0.5s ease-out 0.8s forwards;
    }

    .animate-fadeSlideUp-delay-6 {
      opacity: 0;
      animation: fadeSlideUp-delay-6 0.5s ease-out 0.9s forwards;
    }

    .animate-shake {
      animation: shake 0.4s ease-in-out;
    }
  },
  // eslint-disable-next-line
  plugins: [require(" tailwindcss/forms"), flowbite.plugin()],
};

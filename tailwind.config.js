/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      screens: {
        xs: "378px",
      },
      scale: {
        65: "0.65",
      },
      keyframes: {
        "text-reveal": {
          "100%": {
            color: "#ffffff",
          },
        },
        "text-reveal-box": {
          "50%": {
            width: "100%",
            left: 0,
          },
          "100%": {
            width: 0,
            left: "100%",
          },
        },
        "text-reveal-genre": {
          "0%": {
            "background-image": "none",
            color: "transparent",
            opacity: "0",
          },
          "100%": {
            "background-image":
              "linear-gradient(45deg, #ff3333, #ff8533, #ffff66, #66ff33, #33ffd6, #3349ff, #8f33ff, #ff33cc, #ff3333)",
            color: "transparent",
            opacity: "1",
          },
        },
        gradient: {
          "0%": { backgroundPosition: "0% 0%" },
          "50%": { backgroundPosition: "400% 0%" },
          "100%": { backgroundPosition: "0% 0%" },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "text-reveal-one": "text-reveal 0.5s ease forwards 1.5s",
        "text-reveal-two": "text-reveal 0.5s ease forwards 2.5s",
        "text-reveal-box": "text-reveal-box 1s ease 1s",
        "text-reveal-box-two": "text-reveal-box 1s ease 2s",
        "text-reveal-box-three": "text-reveal-box 1s ease 3s",
        "text-reveal-genre":
          "text-reveal-genre 0.5s ease forwards 3.5s, gradient 20s linear infinite",
        gradient: "gradient 20s linear infinite",
        "fade-in": "fade-in 0.5s ease forwards 4s",
      },
      animationDelay: {
        1500: "1500ms",
        2500: "2500ms",
        3500: "3500ms",
      },
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
      },
      backgroundImage: {
        "rainbow-gradient":
          "linear-gradient(45deg, #ff3333, #ff8533, #ffff66, #66ff33, #33ffd6, #3349ff, #8f33ff, #ff33cc, #ff3333)",
      },
    },
  },
  plugins: [require("tailwindcss-animation-delay")],
};

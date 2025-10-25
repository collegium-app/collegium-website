/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        glow: {
          '0%, 100%': {
            filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.3))',
          },
          '50%': {
            filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.8))',
          },
        },
      },
      animation: {
        glow: 'glow 2.5s ease-in-out infinite',
      },
      colors: {
          brand: "#5C4DFF",
      }
    },
  },
  safelist: [
    {
      pattern: /grid-cols-\d/,
      variants: ["xl", "lg", "md", "sm"],
    },
    {
      pattern: /col-span-\d/,
      variants: ["xl", "lg", "md", "sm"],
    },
    {
      pattern: /gap-\d/,
    },
    {
      pattern: /columns-\d/,
      variants: ["xl", "lg", "md", "sm"],
    },
    {
      pattern: /basis-\d/,
      variants: ["focus"],
    },
    {
      pattern: /bg-(blue|emerald|fuchsia|green|orange|red|yellow)-(300|400|500|600|700)/,
      variants: ["hover", "focus"],
    },
    {
      pattern: /text-\d/,
      variants: ["2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl", "9xl"],
    },
  ],
  plugins: [],
}

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          md: "2rem",
          lg: "4rem",
        },
      },
      screens: {
        sm: "375px",
        md: "768px",
        lg: "1200px",
        xl: "1536px",
        "2xl": "1920px",
        "3xl": "2560px",
        "4xl": "3840px",
      },
      colors: {
        "red-orange": {
          500: 'color-mix(in srgb, theme("colors.red.500") 50%, theme("colors.orange.500") 50%)',
        },
      },
    },
  },
  plugins: [],
};
export default config;

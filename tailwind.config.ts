import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import {nextui} from "@nextui-org/react";

export default {
  content: [
    "./app/**/*.tsx", 
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    './node_modules/@nextui-org/theme/dist/components/(button|snippet|code|input).js',
    
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
} satisfies Config;

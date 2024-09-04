import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { nextui } from "@nextui-org/react";
import flowbite from "flowbite-react/tailwind";

export default {
  content: [
    "./app/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|snippet|code|input).js",
      flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      fontSize: {
        sm2: '0.9rem'
      }
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      defaultExtendTheme: "light",
      themes: {
        lightdark: {
          extend: "light",
          colors: {
            background: "#e8e8e8",
            foreground: "#242424",
            content2: "#dedede",
            content1: "#a4aceb",
          },     
        },
        darklight: {
          extend: "dark",
          colors: {
            background: "#181c19",
            foreground: "#ffffff",
            primary: {
              50: "#3B096C",
              100: "#520F83",
              200: "#7318A2",
              300: "#9823C2",
              400: "#c031e2",
              500: "#DD62ED",
              600: "#F182F6",
              700: "#FCADF9",
              800: "#FDD5F9",
              900: "#FEECFE",
              DEFAULT: "#DD62ED",
              foreground: "#ffffff",
            },
            focus: "#F182F6",
          },
        },
      },
    }), 
  ],
} satisfies Config;

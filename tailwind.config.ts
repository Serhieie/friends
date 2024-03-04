import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        mainBlue: "#255C69",
        darkBlue: "#012B35",
        lightBlue: "#6B949E",
        mediumDarkBlue: "#0F434F",
        mediumLightBlue: "#447884",

        mainYellow: "#AA8739",
        darkYellow: "#553B00",
        lightYellow: "#FFE5AA",
        mediumDarkYellow: "#805F15",
        mediumLightYellow: "#D4B46A",

        mainRed: "#AA4639",
        darkRed: "#550A00",
        lightRed: "#FFB4AA",
        mediumDarkRed: "#802115",
        mediumLightRed: "#D4766A",
      },

      gridTemplateColumns: {
        "33": "repeat(33, minmax(0, 1fr))",
      },
      gridTemplateRows: {
        "24": "repeat(24, minmax(0, 1fr))",
      },

      screens: {
        "2xl": { max: "1535px" },
        xl: { max: "1279px" },
        lg: { max: "1023px" },
        md: { max: "767px" },
        sm: { max: "639px" },
        ssm2: { max: "550px" },
        ssm: { max: "375px" },
        sm2: { min: "640px", max: "767px" },
        md2: { min: "768px", max: "1023px" },
        md3: { min: "768px" },
        mmd2: { min: "900px", max: "1265px" },
        lg2: { min: "1024px", max: "1360px" },
        xl2: { min: "1280px", max: "1535px" },
        "1xl2": { min: "1265px" },
        "2xl2": { min: "1536px" },
      },
    },
  },
  plugins: [],
};
export default config;

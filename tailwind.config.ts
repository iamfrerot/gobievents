import type { Config } from "tailwindcss";

const config: Config = {
 content: [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
 ],
 theme: {
  extend: {
   fontFamily: {
    drunk: "Druk Wide Trial, sans-serif",
   },
   colors: {
    primary: "#FEFCF7",
    secondary: "#FFF152",
    third: "#E6680C",
   },
  },
 },
 plugins: [],
};
export default config;

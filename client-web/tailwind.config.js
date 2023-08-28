/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,ts,jsx,tsx}"];
export const theme = {
  extend: {},
};
export const daisyui = {
  themes: [
    {
      mytheme: {
        primary: "#E35335 ",

        secondary: "#4de2cc",

        accent: "#3df4c0",

        neutral: "#FFBF00",

        "base-100": "#ffffff",

        info: "#2d69eb",

        success: "#80e0b3",

        warning: "#eea853",

        error: "#e8595b",
      },
    },
  ],
};
// eslint-disable-next-line no-undef
export const plugins = [require("daisyui")];

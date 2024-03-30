/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
                lato: ["Lato", "sans-serif"],
                noto: ["Noto Sans", "sans-serif"],
                cursive: ["Oooh Baby", "cursive"],
                lemonBld: ["lemonBold", "sans-serif"],
                lemonMed: ["lemonMed", "sans-serif"],
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["bumblebee"],
    },
};

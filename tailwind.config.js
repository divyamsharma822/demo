/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
        extend: {
            colors: {
                orange: "#e26b34",
                brown: "#563e1f",
                gray: "#818181",
            },
            screens: {
                "3xl": "1800px",
            },
        },
    },
    plugins: [],
};

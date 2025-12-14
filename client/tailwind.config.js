/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: "#00D5FA",
                secondary: "#00353F",
                neutral: {
                    dark: "#333333",
                    light: "#E0E0E0",
                    medium: "#858585",
                },
                background: {
                    default: "#F6F6F6",
                    alt: "#FFFFFF",
                    dark: "#1A1A1A",
                    darkAlt: "#000000"
                }
            },
        },
    },
    plugins: [],
}

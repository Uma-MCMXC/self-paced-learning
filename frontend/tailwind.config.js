/** @type {import('tailwindcss').Config} */
darkMode: "media",
    (module.exports = {
        content: [
            "./app/**/*.{js,ts,jsx,tsx}", // เพิ่มโฟลเดอร์ app
            "./components/**/*.{js,ts,jsx,tsx}",
            "./node_modules/flowbite/**/*.js",
        ],
        theme: {
            extend: {
                colors: {
                    background: {
                        light: "#ffffff",
                        dark: "#0a0a0a",
                    },
                    foreground: {
                        light: "#171717",
                        dark: "#ededed",
                    },
                },
            },
        },
        plugins: [require("flowbite/plugin")],
    });

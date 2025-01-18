/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class", // ใช้ "class" เพื่อให้ควบคุมโหมดด้วยคลาส
    content: [
        "./app/**/*.{js,ts,jsx,tsx}", // ครอบคลุมโฟลเดอร์ app
        "./components/**/*.{js,ts,jsx,tsx}",
        "./node_modules/flowbite/**/*.js",
    ],
    theme: {
        extend: {
            colors: {
                background: {
                    light: "#ffffff", // สีพื้นหลังสำหรับโหมด light
                    dark: "#0a0a0a", // สีพื้นหลังสำหรับโหมด dark
                },
                foreground: {
                    light: "#171717", // สีข้อความสำหรับโหมด light
                    dark: "#ededed", // สีข้อความสำหรับโหมด dark
                },
                primary: {
                    light: "#3b82f6", // สีปุ่มหลักในโหมด light
                    dark: "#2563eb", // สีปุ่มหลักในโหมด dark
                },
                secondary: {
                    light: "#f3f4f6", // สีรองพื้นในโหมด light
                    dark: "#374151", // สีรองพื้นในโหมด dark
                },
            },
            animation: {
                "fade-in": "fadeIn 0.5s ease-out", // เพิ่ม animation fade-in
                "slide-in": "slideIn 0.5s ease-out", // เพิ่ม animation slide-in
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideIn: {
                    "0%": { transform: "translateY(20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
            },
        },
    },
    plugins: [
        require("flowbite/plugin"), // เพิ่มปลั๊กอิน Flowbite
    ],
};

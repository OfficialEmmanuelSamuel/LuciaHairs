const { keyframes, transform } = require("framer-motion");

module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extends : {
            keyframes: {
                shake: {
                    "0%, 100%": {transform: "translateX(0)"},
                    "20%, 100%": {transform: "translateX(-5px)"},
                    "40%, 100%": {transform: "translateX(5px)"},
                    "60%, 100%": {transform: "translateX(-5px)"},
                    "80%, 100%": {transform: "translateX(5px)"},
                },
            },
            animation: {
                shake: "shake 0.5s ease-in-out",
            },
        },
    },
    pluggins: [],
};
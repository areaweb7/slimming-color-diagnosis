/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                brand: {
                    yellow: "#FFE000",
                    blue: "#00A0E9",
                    red: "#E60012",
                    deepYellow: "#FFD900",
                    silver: "#C0C0C0",
                    black: "#1A1A1A",
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            },
            fontFamily: {
                sans: ["var(--font-noto-sans-jp)", "sans-serif"],
            },
            animation: {
                // Shine effect: Brightness pulse (3s)
                "pulse-fast": "shine 3s ease-in-out infinite",
                "bounce-slight": "shine 3s ease-in-out infinite",
            },
            keyframes: {
                // Shine/Glow animation (Brightness)
                shine: {
                    "0%, 100%": { filter: "brightness(100%)" },
                    "50%": { filter: "brightness(120%)" }, // Shine
                },
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}

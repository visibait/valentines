/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],

  safelist: [
    "bg-dark-bold",
    "bg-metal-night",
    "bg-black-glass",
    "text-ice",
    "text-silver",
    "shadow-neon",
    "shadow-dark"
  ],

  theme: {
    extend: {
      fontFamily: {
        display: ["Cormorant Garamond", "serif"],
        body: ["Quicksand", "sans-serif"],
        script: ["Dancing Script", "cursive"]
      },

      colors: {
        blackdeep: "#020204",
        graphite: "#111217",
        charcoal: "#1b1c22",
        steel: "#2c2f38",
        smoke: "#6b7280",
        silver: "#d1d5db",
        ice: "#f8fafc",
        blood: "#7f1d1d",
        crimson: "#dc2626",
        violetdark: "#3b0764"
      },

      boxShadow: {
        neon: "0 0 35px rgba(220, 38, 38, 0.35), 0 0 80px rgba(59, 7, 100, 0.22)",
        dark: "0 30px 100px rgba(0, 0, 0, 0.75)",
        glass: "0 25px 80px rgba(0, 0, 0, 0.45)"
      },

      backgroundImage: {
        "dark-bold":
          "radial-gradient(circle at 15% 10%, rgba(220,38,38,0.25), transparent 30%), radial-gradient(circle at 85% 15%, rgba(75,85,99,0.35), transparent 35%), radial-gradient(circle at 50% 90%, rgba(59,7,100,0.28), transparent 40%), linear-gradient(135deg, #020204 0%, #0a0a0d 35%, #1b1c22 70%, #050505 100%)",

        "metal-night":
          "linear-gradient(135deg, #000000 0%, #111217 28%, #2c2f38 52%, #0a0a0d 78%, #000000 100%)",

        "black-glass":
          "linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.04))",

        "red-line":
          "linear-gradient(90deg, transparent, rgba(220,38,38,0.85), transparent)",

        "silver-shine":
          "linear-gradient(90deg, #ffffff, #9ca3af, #ffffff)"
      },

      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },

        pulseDark: {
          "0%, 100%": {
            opacity: "0.45",
            transform: "scale(1)"
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.08)"
          }
        },

        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" }
        },

        slideGlow: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        }
      },

      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        pulseDark: "pulseDark 4s ease-in-out infinite",
        shimmer: "shimmer 8s ease infinite",
        slideGlow: "slideGlow 3s ease-in-out infinite"
      }
    }
  },

  plugins: []
};

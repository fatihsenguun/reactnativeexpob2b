/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tells Tailwind to look at all your Expo Router files!
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  // THIS IS THE LINE METRO WAS LOOKING FOR:
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // --- Your Custom Stitch B2B Theme ---
        primary: "#000666",             
        "primary-container": "#1a237e",
        "on-primary": "#ffffff",
        secondary: "#4c616c",           
        "secondary-container": "#cfe6f2",
        "on-secondary-container": "#526772",
        tertiary: "#380b00",            
        "tertiary-container": "#5c1800",
        error: "#ba1a1a",               
        "error-container": "#ffdad6",
        background: "#f7f9fc",
        surface: "#f7f9fc",
        "surface-bright": "#f7f9fc",
        "surface-container-lowest": "#ffffff", 
        "surface-container-low": "#f2f4f7",
        "surface-container": "#eceef1",
        "surface-container-high": "#e6e8eb",
        "surface-container-highest": "#e0e3e6",
        "on-surface": "#191c1e",        
        "on-surface-variant": "#454652", 
        outline: "#767683",             
        "outline-variant": "#c6c5d4",
      },
      fontFamily: {
        headline: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"],
      }
    },
  },
  plugins: [],
}
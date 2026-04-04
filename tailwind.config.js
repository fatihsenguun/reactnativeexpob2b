/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tells Tailwind to look at all your Expo Router files!
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  // Required for NativeWind v4:
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // ==========================================
        // 🔵 BUYER PANEL COLORS (From Reliant Commerce)
        // ==========================================
        "buyer-primary": "#004ac6",
        "buyer-primary-container": "#2563eb",
        "buyer-on-primary": "#ffffff",
        
        "buyer-secondary": "#495c95",
        "buyer-secondary-container": "#acbfff",
        "buyer-on-secondary-container": "#394c84",
        
        "buyer-tertiary": "#943700",
        "buyer-tertiary-container": "#bc4800",
        
        "buyer-background": "#f9f9ff",
        "buyer-surface": "#f9f9ff",
        "buyer-surface-bright": "#f9f9ff",
        "buyer-surface-container-lowest": "#ffffff",
        "buyer-surface-container-low": "#f0f3ff",
        "buyer-surface-container": "#e7eefe",
        "buyer-surface-container-high": "#e2e8f8",
        "buyer-surface-container-highest": "#dce2f3",
        
        "buyer-on-surface": "#151c27",
        "buyer-on-surface-variant": "#434655",
        
        "buyer-outline": "#737686",
        "buyer-outline-variant": "#c3c6d7",

        // ==========================================
        // 🟣 SELLER PANEL COLORS (From Operational Intelligence)
        // ==========================================
        "seller-primary": "#3525cd",
        "seller-primary-container": "#4f46e5",
        "seller-on-primary": "#ffffff",
        
        "seller-secondary": "#58579b",
        "seller-secondary-container": "#b6b4ff",
        "seller-on-secondary-container": "#454386",
        
        "seller-tertiary": "#7e3000",
        "seller-tertiary-container": "#a44100",
        
        "seller-background": "#faf8ff",
        "seller-surface": "#faf8ff",
        "seller-surface-bright": "#faf8ff",
        "seller-surface-container-lowest": "#ffffff",
        "seller-surface-container-low": "#f2f3ff",
        "seller-surface-container": "#eaedff",
        "seller-surface-container-high": "#e2e7ff",
        "seller-surface-container-highest": "#dae2fd",
        
        "seller-on-surface": "#131b2e",
        "seller-on-surface-variant": "#464555",
        
        "seller-outline": "#777587",
        "seller-outline-variant": "#c7c4d8",

        // ==========================================
        // 🔴 SHARED / SYSTEM COLORS (Errors, etc.)
        // ==========================================
        error: "#ba1a1a",               
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",
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
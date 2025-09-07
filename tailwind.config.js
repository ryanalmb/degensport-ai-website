/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  darkMode: 'class', // Enable dark mode by default
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        'dark-bg': '#0a0a0a', // Deep charcoal/ink
        'dark-fg': '#f5f5f5', // High-contrast off-white
        
        // Neon/Solana-like accent colors
        'neon-teal': '#00f2fe', // Bright teal
        'neon-green': '#00ff9d', // Bright green
        'neon-purple': '#bf00ff', // Bright purple
        
        // Additional dark theme colors
        'dark-card': '#1a1a1a',
        'dark-border': '#2a2a2a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Clean, highly legible sans-serif
        mono: ['"JetBrains Mono"', 'monospace'], // Monospaced numerals for odds/prob values
      },
    },
},
  plugins: [],
}
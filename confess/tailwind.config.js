/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#05050a',
        teal: '#00ffe1',
        ember: '#ff3d00',
        dark: '#0a0a0f',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
        bebas: ['Bebas Neue', 'sans-serif'],
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        glitch: 'glitch 0.8s ease-in-out',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-2px)' },
          '40%': { transform: 'translateX(2px)' },
          '60%': { transform: 'translateX(-2px)' },
          '80%': { transform: 'translateX(2px)' },
        },
      },
    },
  },
  plugins: [],
};

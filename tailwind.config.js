/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        chamber: {
          navy: '#293277',
          'navy-dark': '#1d2454',
          'navy-deep': '#141a3d',
          green: '#01de99',
          'green-dark': '#00b87a',
          'green-deep': '#00875d',
          'green-soft': 'rgba(1, 222, 153, 0.24)',
        },
      },
      fontFamily: {
        display: ['"Manrope"', '"IBM Plex Sans"', 'sans-serif'],
        body: ['"IBM Plex Sans"', '"Manrope"', 'sans-serif'],
      },
      animation: {
        // No fill-mode: `both` would keep `transform: translateY(0)` on the
        // animated element forever, making it the containing block for the
        // fixed-position tooltips and displacing them on every hover.
        'fade-up': 'fadeUp 0.5s ease-out',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(20, 26, 61, 0.05), 0 8px 24px rgba(20, 26, 61, 0.06)',
        'card-hover': '0 2px 4px rgba(20, 26, 61, 0.06), 0 12px 32px rgba(20, 26, 61, 0.1)',
      },
    },
  },
  plugins: [],
};

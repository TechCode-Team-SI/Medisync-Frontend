import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontFamily: {
        roboto: ['Roboto', 'Tahoma', 'sans-serif'],
        montserrat: ['Montserrat', 'Tahoma', 'sans-serif'],
      },
      colors: {
        gray: {
          50: '#fafbfc',
          100: '#f6f8fa',
          200: '#e1e4e8',
          300: '#d1d5da',
          400: '#959da5',
          500: '#6a737d',
          600: '#586069',
          700: '#444d56',
          800: '#2f363d',
          900: '#24292e',
        },
        blue: {
          50: '#f1f8ff',
          100: '#dbedff',
          200: '#c8e1ff',
          300: '#79b8ff',
          400: '#2188ff',
          500: '#0366d6',
          600: '#005cc5',
          700: '#044289',
          800: '#032f62',
          900: '#05264c',
        },
        black: '#000',
        white: '#fff',
        green: {
          50: '#F2FAF9',
          100: '#CCEAE8',
          200: '#A8DCD9',
          300: '#68C3B7',
          400: '#539091',
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.dummy': {
          border: '1px dashed red',
        },
      });
    }),
  ],
};

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        draw: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        draw: 'draw 3s ease-out forwards',
      },
      fontFamily: {
        'noto-serif': ['"Noto Serif"', 'serif'],
        rubik: ['"Rubik"', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        'roboto-slab': ['"Roboto Slab"', 'serif'],
        Wittgenstein: ['Wittgenstein Serif', 'serif'],
        ubuntu: ['Ubuntu', 'sans-serif'],
        montserrat: ['"Montserrat"', 'sans-serif'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#4B5563',
            borderRadius: '9999px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#E5E7EB',
          },
        },
        '.scrollbar-pink': {
          'scrollbar-width': 'thin',
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#D946EF',
            borderRadius: '9999px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#FBCFE8',
          },
        },
        '.scrollbar-hidden': {
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          'scrollbar-width': 'none',
        },
      });
    },
    function ({ addBase }) {
      addBase({
        'html[dir="rtl"]': {
          direction: 'rtl',
          textAlign: 'right',
        },
        'html[dir="ltr"]': {
          direction: 'ltr',
          textAlign: 'left',
        },
      });
    },
  ],
};

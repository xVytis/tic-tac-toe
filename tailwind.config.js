const colors = require('tailwindcss/colors');

module.exports = {
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        grey: {
          DEFAULT: 'var(--color-grey)',
          dark: 'var(--color-grey-dark)',
        },
        green: {
          DEFAULT: 'var(--color-green)',
          light: 'var(--color-green-light)',
          dark: 'var(--color-green-dark)',
        },
      },
    },
    variants: {},
    plugins: [],
  },
};

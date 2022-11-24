/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bluewood': '#273649',
        'oxford': '#404B5F',
        'oxford-hover': '#2c3442',
        'regent': '#818BA2',
        'loblolly': '#B6BFC7',
        'geyser': '#D7DEE6',
        'geyser-hover': '#c9d2dd',
        'lilac': '#FAFBFD',
        'curious': '#169BD5',
        'mantis': '#92C46B',
        'brick': '#C32A2F',
        'brick-hover': '#AF252A',
        'burgundy': '#C32A2F',
        'tango': '#F37E16',
        'forest': '#337F2D',
        'steel': '#5979B3',
        'gray-border': 'rgba(64, 75, 95, 0.17)'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(({matchComponents, addComponents, theme}) => {
      const makeTriangle = ({name, side}) => ({
        [`.arr-${name || side}`]: {
          '&:before': {
            'content': '""',
            'display': 'block',
            'position': 'absolute',
            'border-top-color': 'transparent',
            'border-bottom-color': 'transparent',

            ...(side === 'left' && {
              'transform': 'translate(-95%, -50%)',
              'top': '50%',
              'left': '0',
              'border-top-width': 'var(--tw-arrow-size)',
              'border-right-width': 'var(--tw-arrow-size)',
              'border-bottom-width': 'var(--tw-arrow-size)',
              'border-left-width': '0',
              'border-top-color': 'transparent',
              'border-right-color': 'var(--tw-arrow-color)',
              'border-bottom-color': 'transparent',
              'border-left-color': 'transparent',
            }),

            ...(side === 'right' && {
              'transform': 'translate(95%, -50%)',
              'top': '50%',
              'right': '0',
              'border-top-width': 'var(--tw-arrow-size)',
              'border-right-width': '0',
              'border-bottom-width': 'var(--tw-arrow-size)',
              'border-left-width': 'var(--tw-arrow-size)',
              'border-top-color': 'transparent',
              'border-right-color': 'transparent',
              'border-bottom-color': 'transparent',
              'border-left-color': 'var(--tw-arrow-color)',
            }),

            ...(side === 'bottom' && {
              'transform': 'translate(-50%, 95%)',
              'bottom': '0',
              'left': '50%',
              'border-top-width': 'var(--tw-arrow-size)',
              'border-right-width': 'var(--tw-arrow-size)',
              'border-bottom-width': '0',
              'border-left-width': 'var(--tw-arrow-size)',
              'border-top-color': 'var(--tw-arrow-color)',
              'border-right-color': 'transparent',
              'border-bottom-color': 'transparent',
              'border-left-color': 'transparent',
            }),

            ...(side === 'top' && {
              'transform': 'translate(-50%, -95%)',
              'top': '0',
              'left': '50%',
              'border-top-width': '0',
              'border-right-width': 'var(--tw-arrow-size)',
              'border-bottom-width': 'var(--tw-arrow-size)',
              'border-left-width': 'var(--tw-arrow-size)',
              'border-top-color': 'transparent',
              'border-right-color': 'transparent',
              'border-bottom-color': 'var(--tw-arrow-color)',
              'border-left-color': 'transparent',
            }),
          }
        }
      });

      matchComponents({'arr': value => ({'--tw-arrow-color': value})}, {values: theme('colors')});
      matchComponents({'bg': value => ({'--tw-arrow-color': value})}, {values: theme('colors')});
      matchComponents({'arr': value => ({'--tw-arrow-size': value})}, {values: theme('width')});

      addComponents({
        ...makeTriangle({name: 'r', side: 'right'}),
        ...makeTriangle({name: 'l', side: 'left'}),
        ...makeTriangle({name: 'b', side: 'bottom'}),
        ...makeTriangle({name: 't', side: 'top'}),
      })
    }),
  ],
}

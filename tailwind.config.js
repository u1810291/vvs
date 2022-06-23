/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bluewood': '#273649',
        'oxford': '#404B5F',
        'regent': '#818BA2',
        'loblolly': '#B6BFC7',
        'geyser': '#D7DEE6',
        'lilac': '#FAFBFD',
        'curious': '#169BD5',
        'mantis': '#92C46B',
        'brick': '#C32A2F',
        'tango': '#F37E16',
        'forest': '#337F2D',
        'steel': '#5979B3'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

/** @type {import('tailwindcss').Config} */
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
        'tango': '#F37E16',
        'forest': '#337F2D',
        'steel': '#5979B3',
        'gray-border': 'rgba(64, 75, 95, 0.17)'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

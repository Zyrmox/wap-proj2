/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
      colors: {
        secondary: {
          50: '#e7ffe7',
          100: '#c9f2c8',
          200: '#aee3ab',
          300: '#94d792',
          400: '#7cc97b',
          500: '#56ae5a',
          600: '#27783d',
          700: '#0f4337',
          800: '#072327',
          900: '#03060d'
        }
      }
    }
  },
  variants: {},
  plugins: []
}

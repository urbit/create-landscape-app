module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: [
        'Inter',
        'Inter UI',
        '-apple-system',
        'BlinkMacSystemFont',
        'San Francisco',
        'Helvetica Neue',
        'Arial',
        'sans-serif'
      ],
      mono: ['Source Code Pro', 'Roboto mono', 'Courier New', 'monospace']
    },
    extend: {}
  },
  screens: {},
  variants: {
    extend: {}
  },
  plugins: []
};

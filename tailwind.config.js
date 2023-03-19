module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary-color': "#FBFBFB",
        'secondary-color': "#507DBC",
        'text-color': "#04080F",
        'accent-color': "FFA400"
      }
  
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
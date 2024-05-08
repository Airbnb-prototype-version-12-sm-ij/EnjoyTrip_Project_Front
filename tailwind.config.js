/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bangwhite: '#ffffff',
        bangblue: '#2bc0e4',
        bangbasic: '#eaecc6'
      }
    }
  },
  plugins: []
}

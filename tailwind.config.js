/** @type {import('tailwindcss').Config} */
import Daisyui from './node_modules/daisyui'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [Daisyui,
    
],
  daisyui: {
    themes: ["autumn"],
  },
}


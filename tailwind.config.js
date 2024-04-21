/** @type {import('tailwindcss').Config} */
import Daisyui from './node_modules/daisyui'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      animation: {
				fade: 'fadeIn  .5s ease-in-out',
			},

			keyframes: {
				fadeIn: {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
        
        
			},
    },
  },
  plugins: [Daisyui,
    
],
  daisyui: {
    themes: ["autumn","cupcake"],
  },
}


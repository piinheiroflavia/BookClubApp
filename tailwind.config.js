/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    "./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        
      },
      colors:{
        dark:{
          fundoEscuroDark: '#DEDFDD',
          900: '#475569'
        },
        tom:{
          branco: '#fff',
          tomRoxoEscuro: '#0054e9',
          tomRoxoClaro: '#273B7D',
          tomRosaEscuro: '#E66D70',
          tomRosaClaro: '#FDA4A9',
        }
      }
    },
  },
  plugins: [],
}


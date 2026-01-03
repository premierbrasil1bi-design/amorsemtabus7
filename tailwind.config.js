/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          wine: '#5D1822',       // Vinho Profundo (Sangue/Paixão)
          wineDark: '#3A0E14',   // Vinho quase preto para contrastes
          beige: '#FDFBF7',      // Off-white quente (Papel antigo/Pele)
          surface: '#F5F2EB',    // Bege levemente mais escuro para cards
          gold: '#C5A059',       // Ouro envelhecido
          text: '#1F1F1F',       // Grafite (Autoridade)
          muted: '#5A5A5A',      // Cinza médio
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

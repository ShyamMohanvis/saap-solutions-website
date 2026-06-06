/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        deep: {
          900: '#0b1530',
          800: '#0f1d44',
        },
        accent: {
          cyan: '#00d0ff',
          orange: '#ff7a59',
          purple: '#7c3aed',
          lime: '#84cc16',
        }
      },
      boxShadow: {
        glow: '0 10px 30px rgba(0,208,255,0.25)'
      },
      borderRadius: {
        xl: '14px'
      }
    },
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      display: ['Poppins', 'Inter', 'ui-sans-serif']
    }
  },
  plugins: []
}







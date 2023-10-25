/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        tablet: '600px',
        desktop: '1024px'
      },
      extend: {
        fontSize: {
          '10xl': '10rem',
        }
      }
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 }
        },
        intense: {
          '75%, 100%': {
            transform: 'scale(1.2)',
            opacity: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        intense: 'intense 1s cubic-bezier(0, 0, 0.2, 1) infinite'
      }
    }
  },
  plugins: [
    require('tailwindcss-animate'),
    require('tailwindcss-radix')(),
    require('windy-radix-palette')()
  ]
}

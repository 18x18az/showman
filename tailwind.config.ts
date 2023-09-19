import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('tailwindcss-radix')(),
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('windy-radix-palette')()
  ],
  theme: {
    screens: {
      tablet: '600px',
      desktop: '1024px'
    },
    extend: {
      animation: {
        'intense': 'intense 1s cubic-bezier(0, 0, 0.2, 1) infinite'
      },
      keyframes: {
        'intense': {
          '75%, 100%': {
            transform: 'scale(1.2)',
            opacity: '0'
          }
        }
      }
    }
  }
}

export default config

import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: "class",
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('tailwindcss-radix')(),
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('radix-colors-for-tailwind')({
      colors: ['slate', 'iris']
    })
  ]
}
export default config

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bimco-blue': '#003b71',
        'bimco-light-blue': '#0066cc',
        'bimco-navy': '#1e3a5f',
      },
    },
  },
  plugins: [],
}
export default config

const { join } = require('path')
const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind')
const typography = require('@tailwindcss/typography')
const lineClamp = require('@tailwindcss/line-clamp')
const daisyui = require('daisyui')

module.exports = {
  content: [
    join(__dirname, 'src/**/*.{ts,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  plugins: [typography, lineClamp, daisyui],
  daisyui: {
    themes: ['wireframe'],
  },
}

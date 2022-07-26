const { join } = require('path')
const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind')
const typography = require('@tailwindcss/typography')
const lineClamp = require('@tailwindcss/line-clamp')
const daisyui = require('daisyui')

module.exports = {
  content: [
    join(__dirname, 'src/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [typography, lineClamp, daisyui],
  daisyui: {
    themes: ['wireframe'],
  },
}

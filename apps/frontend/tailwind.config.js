const { join } = require('path')
const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind')
const daisyui = require('daisyui')

module.exports = {
  content: [
    join(__dirname, 'src/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['dark'],
  },
}

// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: {
    css: true,
    html: true,
    markdown: 'prettier',
  },
  rules: {
    // eslint-disable-next-line node/prefer-global/process
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // eslint-disable-next-line node/prefer-global/process
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
})

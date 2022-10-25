const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_posts/*.md',
    './*.html',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '960px',
      xl: '1440px'
    },
    extend: {
      colors: {
        estupinanLightBlue: 'rgb(135, 170, 205)',
        estupinanBlue: 'rgb(0, 165, 223)',
        estupinanDark: 'rgb(14, 21, 29)'
      },
      fontFamily: {
        sans: ['Josefin Sans', ...defaultTheme.fontFamily.sans],
        mono: [
          'JetBrains Mono',
        ],
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
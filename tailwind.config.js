const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './**/*.md',
    './*.html',
  ],
  theme: {
    screens: {
      sm: '720px',
      md: '960px',
      lg: '1080px',
      xl: '1920px'
    },
    extend: {
      colors: {
        estupinanBlueBase: 'rgb(135, 170, 205)',
        estupinanBlueWhite: 'rgb(228, 239, 249)',
        estupinanLightBlue: 'rgb(182, 207, 231)',
        estupinanGrayBlue: 'rgb(91, 132, 172)',
        estupinanDarkBlue: 'rgb(59, 103, 145)',
        estupinanPurpleBase: 'rgb(149, 145, 212)',
        estupinanPurpleWhite: 'rgb(231, 230, 250)',
        estupinanLightPurple: 'rgb(191, 189, 234)',
        estupinanGrayPurple: 'rgb(108, 104, 184)',
        estupinanDarkPurple: 'rgb(75, 70, 156)',
        estupinanYellowBase: 'rgb(255, 233, 161)',
        estupinanYellowWhite: 'rgb(255, 250, 232)',
        estupinanLightYellow: 'rgb(255, 241, 197)',
        estupinanGrayYellow: 'rgb(255, 225, 125)',
        estupinanDarkYellow: 'rgb(224, 190, 81)',
        estupinanOrangeBase: 'rgb(255, 217, 161)',
        estupinanOrangeWhite: 'rgb(255, 246, 232)',
        estupinanLightOrange: 'rgb(255, 231, 197)',
        estupinanGrayOrange: 'rgb(255, 202, 125)',
        estupinanDarkOrange: 'rgb(224, 166, 81)',
        estupinanGreenBase: 'rgb(137, 217, 164)',
        estupinanGreenWhite: 'rgb(228, 250, 235)',
        estupinanLightGreen: 'rgb(183, 237, 201)',
        estupinanGrayGreen: 'rgb(94, 192, 127)',
        estupinanDarkGreen: 'rgb(59, 164, 95)',
        estupinanBlue: 'rgb(0, 165, 223)',
        estupinanDark: 'rgb(14, 21, 29)'
      },
      fontFamily: {
        sans: ['Josefin Sans', ...defaultTheme.fontFamily.sans],
        mono: [
          'JetBrains Mono',
        ],
      },
      typography: ({ theme }) => ({
        invert: {
          css: {
            '--tw-prose-body': 'rgb(182, 207, 231)',
            '--tw-prose-headings': 'rgb(182, 207, 231)',
            '--tw-prose-lead': theme('colors.pink[700]'),
            '--tw-prose-links': 'rgb(0, 165, 223)',
            '--tw-prose-bold': 'rgb(228, 239, 249)',
            '--tw-prose-counters': theme('colors.pink[600]'),
            '--tw-prose-bullets': theme('colors.pink[400]'),
            '--tw-prose-hr': theme('colors.pink[300]'),
            '--tw-prose-quotes': theme('colors.pink[900]'),
            '--tw-prose-quote-borders': theme('colors.pink[300]'),
            '--tw-prose-captions': theme('colors.pink[700]'),
            '--tw-prose-code': theme('colors.pink[900]'),
            '--tw-prose-pre-code': theme('colors.pink[100]'),
            '--tw-prose-pre-bg': theme('colors.pink[900]'),
            '--tw-prose-th-borders': theme('colors.pink[300]'),
            '--tw-prose-td-borders': theme('colors.pink[200]'),
            '--tw-prose-invert-body': theme('colors.pink[200]'),
            '--tw-prose-invert-headings': theme('colors.white'),
            '--tw-prose-invert-lead': theme('colors.pink[300]'),
            '--tw-prose-invert-links': theme('colors.white'),
            '--tw-prose-invert-bold': theme('colors.white'),
            '--tw-prose-invert-counters': theme('colors.pink[400]'),
            '--tw-prose-invert-bullets': theme('colors.pink[600]'),
            '--tw-prose-invert-hr': theme('colors.pink[700]'),
            '--tw-prose-invert-quotes': theme('colors.pink[100]'),
            '--tw-prose-invert-quote-borders': theme('colors.pink[700]'),
            '--tw-prose-invert-captions': theme('colors.pink[400]'),
            '--tw-prose-invert-code': theme('colors.white'),
            '--tw-prose-invert-pre-code': theme('colors.pink[300]'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.pink[600]'),
            '--tw-prose-invert-td-borders': theme('colors.pink[700]'),
          },
        },
      }),
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
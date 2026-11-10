export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Graphite ramp, warmed slightly at the light end so paper never glares
        g: {
          50: '#f2f1ee',
          100: '#eae8e3',
          200: '#dedbd4',
          300: '#c9c5bc',
          400: '#9c978d',
          500: '#726d64',
          600: '#565149',
          700: '#403c36',
          800: '#232325',
          850: '#19191b',
          900: '#141415',
          950: '#0f0f10',
        },
        // Raised light surface: an off-white paper, not #fff
        paper: '#fcfbf9',
        // Single accent taken from the control-room world
        accent: {
          DEFAULT: '#d97706',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        positive: '#16a34a',
        negative: '#dc2626',
      },
      fontFamily: {
        sans: ['var(--app-font)', 'sans-serif'],
        mono: ['var(--app-mono)', 'monospace'],
      },
      transitionTimingFunction: {
        ui: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

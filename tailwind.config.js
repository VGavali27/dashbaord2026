const withAlpha = (variable) => `rgb(var(${variable}) / <alpha-value>)`

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neutral ramp, tinted per theme through CSS variables
        g: {
          50: withAlpha('--g-50'),
          100: withAlpha('--g-100'),
          200: withAlpha('--g-200'),
          300: withAlpha('--g-300'),
          400: withAlpha('--g-400'),
          500: withAlpha('--g-500'),
          600: withAlpha('--g-600'),
          700: withAlpha('--g-700'),
          800: withAlpha('--g-800'),
          850: withAlpha('--g-850'),
          900: withAlpha('--g-900'),
          950: withAlpha('--g-950'),
        },
        paper: withAlpha('--paper'),
        primary: {
          DEFAULT: withAlpha('--primary'),
          hover: withAlpha('--primary-hover'),
        },
        secondary: withAlpha('--secondary'),
        highlight: withAlpha('--highlight'),
        accent: {
          DEFAULT: withAlpha('--accent'),
          400: withAlpha('--accent-400'),
          500: withAlpha('--accent-500'),
          600: withAlpha('--accent-600'),
          700: withAlpha('--accent-700'),
        },
        positive: withAlpha('--positive'),
        warning: withAlpha('--warning'),
        negative: withAlpha('--negative'),
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

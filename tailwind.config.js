module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,,scss}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      mono: ['Fira Code'],
      candal: ['var(--font-candal)'],
    },
    extend: {
      colors: {
        brand: {
          dark: '#5549A6',
          light: '#fffef3',
          primary: '#7553A6',
          secondary: '#A47ED9',
          soft: '#DAB6F2',
          accent: '#C043FF',
        },
        feedback: {
          error: '#FF0000',
          warning: '#FFC107',
          success: '#4BB543',
        },
        transparent: 'transparent',
      },
      backgroundImage: {
        'effect-granula': "url('/effectgranula.png')",
      },
      minHeight: {
        'screen-nav': 'calc(100vh - 7rem)',
      },
    },
  },
}

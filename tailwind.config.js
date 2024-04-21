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
    },
    extend: {
      colors: {
        brand: {
          dark: '#030826',
          light: '#fffef3',
          primary: '#F27141',
          secondary: '#F28B30',
          soft: '#F28D77',
          accent: '#F24C27',
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

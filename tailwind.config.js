/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f0',
          100: '#dcf1dc',
          200: '#bae3ba',
          300: '#8ecf8e',
          400: '#60b760',
          500: '#4CAF50', // Main primary
          600: '#3a863e',
          700: '#306a33',
          800: '#2a552c',
          900: '#244727',
          950: '#0f2710',
        },
        secondary: {
          50: '#fef9ee',
          100: '#fdf0d6',
          200: '#face9e',
          300: '#f7ae66',
          400: '#f58a34',
          500: '#F57C00', // Main secondary/accent (terracotta)
          600: '#dd5f05',
          700: '#b74308',
          800: '#93340f',
          900: '#782d0f',
          950: '#411406',
        },
        beige: {
          50: '#fbfaf3',
          100: '#f5f3e4',
          200: '#ebe5c9',
          300: '#dfd2a8',
          400: '#D4C094', // Main beige
          500: '#c3a772',
          600: '#b18a5b',
          700: '#96704b',
          800: '#7c5c41',
          900: '#664c38',
          950: '#382918',
        },
        success: {
          500: '#22c55e',
        },
        warning: {
          500: '#f59e0b',
        },
        error: {
          500: '#ef4444',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '0.5': '4px',
        '1': '8px',
        '1.5': '12px',
        '2': '16px',
        '2.5': '20px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
        '8': '64px',
        '10': '80px',
        '12': '96px',
      },
      animation: {
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors (green scale)
        primary: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e', // Main primary green
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        // Secondary accent colors (lighter green / white blend)
        secondary: {
          50:  '#ffffff', // white
          100: '#f9faf9',
          200: '#e6f0e6',
          300: '#cde1cd',
          400: '#a8cba8',
          500: '#7fbf7f', // medium green
          600: '#599559',
          700: '#3b6f3b',
          800: '#2c522c',
          900: '#1e3a1e',
          950: '#0f1f0f',
        },
        // Success colors (strong green)
        success: {
          50:  '#e6f9e6',
          100: '#c7f0c7',
          200: '#a3e5a3',
          300: '#7fd97f',
          400: '#59cd59',
          500: '#3bb43b', // main success green
          600: '#2f8e2f',
          700: '#226622',
          800: '#174417',
          900: '#0d260d',
          950: '#041104',
        },
        // Warning colors (soft green-yellow, leaning white)
        warning: {
          50:  '#f7fef7',
          100: '#e9fce9',
          200: '#d6f5d6',
          300: '#bce9bc',
          400: '#9ddf9d',
          500: '#7fd57f', // soft warning green
          600: '#61b761',
          700: '#4a8f4a',
          800: '#356735',
          900: '#223922',
          950: '#111d11',
        },
        // Error colors (very light green to white)
        error: {
          50:  '#f7f9f7',
          100: '#ebf2eb',
          200: '#d9e4d9',
          300: '#bdd0bd',
          400: '#a4c2a4',
          500: '#8ab98a', // muted green error
          600: '#6d8d6d',
          700: '#516651',
          800: '#364336',
          900: '#1c221c',
          950: '#0a100a',
        },
        // Neutral colors (white to very light green)
        neutral: {
          50:  '#ffffff',
          100: '#f9faf9',
          200: '#f0f5f0',
          300: '#e6eee6',
          400: '#d1ddd1',
          500: '#b8cbb8',
          600: '#97a897',
          700: '#6d7e6d',
          800: '#4a594a',
          900: '#2b332b',
          950: '#161916',
        },
        // Ecommerce-specific colors updated to green & white tones
        price: '#14532d',    // dark green for prices
        deal: '#4ade80',     // bright green for deals
        sale: '#22c55e',     // main primary green for sales
        new: '#86efac',      // lighter green for new items
        rating: '#a8cba8',   // soft green for ratings
        shipping: '#7fbf7f', // medium green for shipping info
        trust: '#3bb43b',    // success green for trust indicators
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        ecommerce: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'ecommerce-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'ecommerce-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 0.6s ease-in-out',
        'pulse-gentle': 'pulseGentle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(0)' },
        },
        pulseGentle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.8' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

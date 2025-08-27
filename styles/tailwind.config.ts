import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern Primary - Deep Teal (trustworthy, professional)
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6', // Main primary - modern teal
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        // Secondary - Warm Coral (friendly, engaging)
        secondary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // Main secondary - warm coral
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        // Success - Soft Emerald (trust and confidence)
        success: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981', // Main success - soft emerald
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        // Warning - Gentle Amber (attention without harshness)
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // Main warning - gentle amber
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        // Error - Muted Red (clear feedback without aggression)
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444', // Main error - muted red
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        // Neutral - Warm Grays (softer than pure grays)
        neutral: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
        // Light Mode Specific Colors - Professional & Friendly
        light: {
          // Backgrounds - Soft, warm, professional
          bg: {
            primary: '#ffffff', // Pure white for main content
            secondary: '#fefefe', // Slightly off-white for subtle contrast
            tertiary: '#fafafa', // Very light gray for cards
            quaternary: '#f8f9fa', // Light blue-gray for sections
            elevated: '#ffffff', // White for elevated elements
            subtle: '#f5f7fa', // Very light blue-gray for subtle backgrounds
            warm: '#fefcf9', // Very light warm tint
            cool: '#f8fafc', // Very light cool tint
          },
          // Surfaces - Cards, panels, containers
          surface: {
            primary: '#ffffff', // Main surface color
            secondary: '#fefefe', // Secondary surface
            tertiary: '#fafafa', // Tertiary surface
            elevated: '#ffffff', // Elevated surface with shadow
            card: '#ffffff', // Card background
            panel: '#fefefe', // Panel background
            modal: '#ffffff', // Modal background
            sidebar: '#f8fafc', // Sidebar background
          },
          // Borders - Subtle, professional
          border: {
            primary: '#e5e7eb', // Main border color
            secondary: '#f3f4f6', // Secondary border
            tertiary: '#f9fafb', // Tertiary border
            subtle: '#f1f5f9', // Very subtle border
            accent: '#e0e7ff', // Accent border (blue tint)
            success: '#d1fae5', // Success border
            warning: '#fef3c7', // Warning border
            error: '#fee2e2', // Error border
          },
          // Text - Professional, readable
          text: {
            primary: '#1f2937', // Main text - dark but not harsh
            secondary: '#4b5563', // Secondary text
            tertiary: '#6b7280', // Tertiary text
            muted: '#9ca3af', // Muted text
            subtle: '#d1d5db', // Very subtle text
            inverse: '#ffffff', // Text on dark backgrounds
            accent: '#3b82f6', // Accent text
            success: '#059669', // Success text
            warning: '#d97706', // Warning text
            error: '#dc2626', // Error text
          },
          // Interactive elements
          interactive: {
            hover: '#f3f4f6', // Hover state
            active: '#e5e7eb', // Active state
            focus: '#dbeafe', // Focus state
            selected: '#eff6ff', // Selected state
            disabled: '#f9fafb', // Disabled state
          },
          // Shadows - Subtle, professional
          shadow: {
            sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
            soft: '0 2px 8px rgba(0, 0, 0, 0.08)',
            'soft-lg': '0 4px 16px rgba(0, 0, 0, 0.12)',
            'soft-xl': '0 8px 32px rgba(0, 0, 0, 0.16)',
          },
        },
        // Ecommerce-specific colors - Refined and user-friendly
        'price': '#dc2626', // Muted red for prices (less aggressive)
        'deal': '#f59e0b', // Warm amber for deals
        'sale': '#ef4444', // Muted red for sales
        'new': '#10b981', // Soft emerald for new items
        'rating': '#fbbf24', // Warm gold for ratings
        'shipping': '#14b8a6', // Teal for shipping info
        'trust': '#059669', // Emerald for trust indicators
        'accent': '#f97316', // Coral for highlights
        'highlight': '#f0fdfa', // Very light teal for backgrounds
        'subtle': '#f8fafc', // Very light blue-gray for subtle backgrounds
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
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 4px 16px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 0.6s ease-in-out',
        'pulse-gentle': 'pulseGentle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
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
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

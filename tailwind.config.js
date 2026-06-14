/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0B0F1A',
        surface: '#111827',
        border: '#1E2D45',
        accent: '#38BDF8',
        accentDim: '#0EA5E9',
        muted: '#64748B',
        text: '#E2E8F0',
        textSoft: '#94A3B8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        display: ['"Cal Sans"', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'blink': 'blink 1s step-end infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        glow: {
          '0%': { boxShadow: '0 0 10px #38BDF830' },
          '100%': { boxShadow: '0 0 30px #38BDF860' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(20px)' },
        },
      },
    },
  },
  plugins: [],
}

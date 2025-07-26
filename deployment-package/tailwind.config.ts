import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'paw-primary': '#007C8C',     // Primary Teal - 主色调
        'paw-deep': '#004C5C',        // Deep Teal - 深色强调
        'paw-light': '#F6F6F1',       // Ivory White - 浅色背景
        'paw-dark': '#0F1114',        // Ink Black - 文字和logo
        'paw-accent': '#00FFE0',      // Bright accent color
        'paw-gradient-1': '#00D9FF',  // Gradient color 1
        'paw-gradient-2': '#00FFE0',  // Gradient color 2
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'PingFang SC',
          'Hiragino Sans GB',
          'Microsoft YaHei',
          'WenQuanYi Micro Hei',
          'sans-serif'
        ],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'modal-in': 'modalIn 0.3s ease-out',
        'backdrop-in': 'backdropIn 0.3s ease-out',
        'floating': 'floating 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'gradient-shift': 'gradientShift 3s ease infinite',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        modalIn: {
          '0%': { opacity: '0', transform: 'scale(0.9) translateY(-20px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        backdropIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        floating: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 10px theme(colors.paw-accent)' },
          '100%': { boxShadow: '0 0 20px theme(colors.paw-accent), 0 0 30px theme(colors.paw-accent)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        pulseSlow: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.9' },
        },
      },
    },
  },
  plugins: [],
}
export default config 
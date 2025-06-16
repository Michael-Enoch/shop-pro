// tailwind.config.js
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#1F2937',
        'primary-light': '#3B82F6',
        secondary: '#A78B6B',
        'neutral-dark': '#374151',
        'neutral-light': '#F3F4F6',
        accent: '#F97316',
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // You can put your custom color variables here
      colors: {
        'bg-color': '#f4f7fa',
        'sidebar-bg': '#1e293b',
        'card-bg': '#ffffff',
        'text-primary': '#1e293b',
        'text-secondary': '#64748b',
        'text-light': '#f8fafc',
        'accent-color': '#3b82f6',
        'border-color': '#e2e8f0',
        'success-color': '#22c55e',
        'warning-color': '#f59e0b',
        'danger-color': '#ef4444',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        custom: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
}

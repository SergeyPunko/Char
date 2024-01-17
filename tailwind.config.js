/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'body-bg': 'var(--body-bg)',
        'main-text': 'var(--main-text)',
        'border-color': 'var(--border-color)',
        'primary-color': 'var(--primary-color)',
        'secondary-text-color': 'var(--secondary-text-color)',
        'chat-bg': 'var(--chat-bg)',
      },
    },
  },
  plugins: [],
};

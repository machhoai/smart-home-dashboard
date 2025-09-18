module.exports = {
    purge: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    darkMode: false,
    theme: {
        extend: {},
    },
    variants: {},
    plugins: [
        require('tailwindcss-filters'),
    ],
}
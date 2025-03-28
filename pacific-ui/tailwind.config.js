/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './app/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            animation: {
                'unique-gradient': 'gradient-wave 8s ease infinite',
                ripple: 'ripple 0.4s ease-out',
            },
            keyframes: {
                'gradient-wave': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '25%': { backgroundPosition: '50% 100%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '75%': { backgroundPosition: '50% 0%' },
                    '100%': { backgroundPosition: '0% 50%' },
                    ripple: {
                        '0%': { transform: 'scale(0)', opacity: '0.5' },
                        '100%': { transform: 'scale(2)', opacity: '0' },
                    },
                },
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
};


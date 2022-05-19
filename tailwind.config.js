// tailwind.config.js
const colors = require('tailwindcss/colors')

module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	important: true,
	opacity: {
		0: '0',
		10: 'o.1',
		20: '0.2',
		30: '0.3',
		40: '0.4',
		50: '0.5',
		60: '0.6',
		70: '0.7',
		80: '0.8',
		90: '0.9',
		100: '1',
	},
	plugins: [
		require('@tailwindcss/aspect-ratio'),
		require('tailwindcss-children'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/line-clamp'),
		require('@tailwindcss/typography'),
	],
	prefix: 'tw-',
	screens: {
		sm: '640px',
		// => @media (min-width: 640px) { ... }

		md: '768px',
		// => @media (min-width: 768px) { ... }

		lg: '1024px',
		// => @media (min-width: 1024px) { ... }

		xl: '1280px',
		// => @media (min-width: 1280px) { ... }

		'2xl': '1536px',
		// => @media (min-width: 1536px) { ... }
	},
	spacing: {
		1: '8px',
		2: '12px',
		3: '16px',
		4: '24px',
		5: '32px',
		6: '48px',
	},
	theme: {
		extend: {
			spacing: {
				'8xl': '96rem',
				'9xl': '128rem',
			},
			borderRadius: {
				'4xl': '2rem',
			},
		},
		fill: ({ theme }) => ({
			gray: theme('colors.gray'),
		}),
		fontFamily: {
			sans: ['Graphik', 'sans-serif'],
			serif: ['Merriweather', 'serif'],
		},
	},
	variants: {
		extend: {},
	},
}

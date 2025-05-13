import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		colors: {
			text: 'rgb(241, 233, 246)',
			background: 'rgb(16, 7, 22)',
			primary: 'rgb(196, 149, 224)',
			secondary: 'rgb(93, 32, 131)',
			accent: 'rgb(151, 49, 213)'
		}
	},

	plugins: [typography, forms, containerQueries, aspectRatio]
} satisfies Config;

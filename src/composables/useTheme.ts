import { definePreset, palette } from '@primevue/themes';
import Aura from '@primevue/themes/aura';

// const customColors = palette('#f2744c');
const customColors = palette('#101212');

export const MyPreset = definePreset(Aura, {
	semantic: {
		primary: {
			50: customColors['50'],
			100: customColors['100'],
			200: customColors['200'],
			300: customColors['300'],
			400: customColors['400'],
			500: customColors['500'],
			600: customColors['600'],
			700: customColors['700'],
			800: customColors['800'],
			900: customColors['900'],
			950: customColors['950'],
		},
		colorScheme: {
			light: {
				formField: {
					hoverBorderColor: '{primary.color}',
				},
			},
		},
	},
});

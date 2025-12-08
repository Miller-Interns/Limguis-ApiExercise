import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import { InputText } from 'primevue';
import 'primeicons/primeicons.css';
import App from './App.vue';
import router from './router';
import './assets/main.css';
import { MyPreset } from './composables/useTheme';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(PrimeVue, {
	theme: {
		preset: MyPreset,
		options: {
			prefix: 'p',
			darkModeSelector: false,
			cssLayer: false,
		},
	},
});
app.component('Button', Button);
app.component('InputText', InputText);
app.mount('#app');

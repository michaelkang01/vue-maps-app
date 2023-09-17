import './assets/main.scss'

import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

app.config.globalProperties.googleMapsKey = 'API_KEY_HERE';
app.mount('#app');

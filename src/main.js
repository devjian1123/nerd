import App from '@/App.vue';
import '@/style.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

createApp(App).use(createPinia()).mount('#app');

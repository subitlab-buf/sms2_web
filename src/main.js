import {createApp} from 'vue';
import {createPinia} from 'pinia';

import App from './App.vue';
import router from './router';

// Arco Design
import ArcoVue from "@arco-design/web-vue";
import '@arco-design/web-vue/dist/arco.css';

import './assets/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(ArcoVue);

app.mount('#app');

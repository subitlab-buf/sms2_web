import {createApp} from 'vue';

import App from './App.vue';
import router from './router';

// Arco Design
import ArcoVue from "@arco-design/web-vue";
import '@arco-design/web-vue/dist/arco.css';


import './assets/main.css';
import {store} from "./store/index.js";

const app = createApp(App);

app.use(router);

app.use(ArcoVue);

app.use(store);

app.mount('#app');

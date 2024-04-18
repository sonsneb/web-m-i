import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueHead from 'vue-head';
const app = createApp(App);

app.use(router);
app.use(VueHead);

app.mount('#app');

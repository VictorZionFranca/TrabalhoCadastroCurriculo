import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueTheMask from 'vue-the-mask'; // Importe o VueTheMask

const app = createApp(App);

// Use o VueTheMask no Vue 3
app.use(VueTheMask);

app.use(router); // Adiciona o roteador à aplicação
app.mount('#app'); // Renderiza o aplicativo no DOM

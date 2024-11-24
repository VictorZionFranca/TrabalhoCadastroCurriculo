import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import VueTheMask from 'vue-the-mask';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import 'bootstrap'; // Importa o JavaScript do Bootstrap


const app = createApp(App);

// Use o VueTheMask no Vue 3
app.use(VueTheMask);

app.use(router); // Adiciona o roteador à aplicação
app.mount('#app'); // Renderiza o aplicativo no DOM

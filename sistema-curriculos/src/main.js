import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router); // Adiciona o roteador à aplicação
app.mount('#app'); // Renderiza o aplicativo no DOM

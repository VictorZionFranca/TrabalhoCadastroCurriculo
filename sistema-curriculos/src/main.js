import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import VueTheMask from 'vue-the-mask';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import 'bootstrap'; // Importa o JavaScript do Bootstrap

// Importações do FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'; // Corrigido aqui
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHome, faUser, faPhone,faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, faInstagram} from '@fortawesome/free-brands-svg-icons';


// Adicione os ícones ao objeto 'library'
library.add(faHome, faUser, faPhone, faEnvelope, faLinkedin, faGithub, faInstagram);

const app = createApp(App);

// Use o VueTheMask no Vue 3
app.use(VueTheMask);

// Registre o componente FontAwesome
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router); // Adiciona o roteador à aplicação
app.mount('#app'); // Renderiza o aplicativo no DOM

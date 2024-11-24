<template>
  <div id="app">
    <!-- Cabeçalho -->
    <header>
      <div class="logo">
        <h1>Sistema de Currículos</h1>
      </div>
      <nav>
        <router-link to="/" class="nav-link">Início</router-link>
        <router-link to="/cadastrar" class="nav-link">Cadastrar Currículo</router-link>
        <router-link to="/curriculos" class="nav-link">Ver Currículos</router-link>
      </nav>
    </header>

    <!-- Conteúdo Principal -->
    <main>
      <router-view />
    </main>

    <!-- Rodapé -->
    <footer>
      <p>© 2024 Sistema de Currículos</p>
      <p>Entre em contato conosco:</p>
      <div class="contact-links">
        <a href="mailto:contato@sistemacurriculos.com">contato@sistemacurriculos.com</a>
        <a href="tel:+5511999999999">+55 11 99999-9999</a>
        <a href="https://www.linkedin.com/company/sistemacurriculos" target="_blank">LinkedIn</a>
        <a href="https://twitter.com/sistemacurriculos" target="_blank">Twitter</a>
        <a href="https://www.facebook.com/sistemacurriculos" target="_blank">Facebook</a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
/* Estilos globais */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f4;
  color: #333;
}

a {
  text-decoration: none;
  color: inherit;
}

/* Cabeçalho */
header {
  background-color: #007bff;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header .logo h1 {
  font-size: 1.8rem;
}

nav {
  display: flex;
  gap: 25px;
}

nav .nav-link {
  font-size: 18px;
  color: white;
  transition: 0.3s;
}

nav .nav-link:hover {
  color: #ffdd57;
  scale: 1.2;
  transition: 0.3s;
}

/* Main */
main {
  padding: 20px;
  margin: 0 auto;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

footer {
  background-color: #222;
  color: white;
  text-align: center;
  padding: 20px 0;
}

footer p {
  font-size: 0.9rem;
  margin: 5px 0;
}

footer a {
  color: #ffdd57;
  font-size: 1rem;
}

footer a:hover {
  text-decoration: underline;
}

footer .contact-links {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

footer .contact-links a {
  color: #ffdd57;
  font-size: 1rem;
  transition: color 0.3s;
}

footer .contact-links a:hover {
  color: #ff9e00;
}

/* Responsividade */
@media (max-width: 768px) {
  header {
    flex-direction: column;
    align-items: flex-start;
  }

  header .logo h1 {
    margin-bottom: 10px;
  }

  nav {
    flex-direction: column;
    gap: 10px;
  }

  nav .nav-link {
    font-size: 1.2rem;
  }
}
</style>

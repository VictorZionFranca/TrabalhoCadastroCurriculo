<template>
  <div id="app">
    <!-- Cabeçalho -->
    <header class="bg-primary text-white py-3">
      <div class="container d-flex justify-content-between align-items-center">
        <h1 class="h4 m-0">Sistema de Currículos</h1>
        <nav class="d-flex gap-3">
          <router-link to="/" class="nav-link text-white">Início</router-link>
          <router-link to="/cadastrar" class="nav-link text-white">Cadastrar Currículo</router-link>
          <router-link to="/curriculos" class="nav-link text-white">Ver Currículos</router-link>
        </nav>
      </div>
    </header>

    <!-- Conteúdo Principal -->
    <main class="container my-4">
      <router-view />
    </main>

    <!-- Rodapé -->
    <footer class="bg-dark text-white py-4">
      <div class="container text-center">
        <p class="mb-1">© 2024 Sistema de Currículos</p>
        <p class="mb-3">Entre em contato conosco:</p>
        <div class="d-flex justify-content-center gap-3">
          <a href="mailto:vzion435@gmail.com" class="text-warning"><font-awesome-icon :icon="['fas', 'envelope']" /> Email</a>
          <a href="tel:+5511999999999" class="text-warning"><font-awesome-icon :icon="['fas', 'phone']" /> Telefone</a>
          <a href="https://www.linkedin.com/company/sistemacurriculos" target="_blank" class="text-warning"><font-awesome-icon :icon="['fab', 'linkedin']" /> LinkedIn</a>
          <a href="https://github.com/VictorZionFranca" target="_blank" class="text-warning"><font-awesome-icon :icon="['fab', 'github']" /> GitHub</a>
          <a href="#" class="text-warning"><font-awesome-icon :icon="['fab', 'instagram']" /> Instagram</a>
        </div>
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
/* Customizações adicionais */
.nav-link:hover {
  text-decoration: underline;
}
</style>

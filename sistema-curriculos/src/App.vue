<template>
  <div id="app">
    <!-- Cabeçalho fixo -->
    <header class="bg-primary text-white py-3 fixed-top w-100 shadow">
      <div class="container d-flex justify-content-between align-items-center">
        <router-link to="/" class="text-white link-underline link-underline-opacity-0">
          <h1 class="h4 m-0">Sistema de Currículos</h1>
        </router-link>

        <!-- Menu normal para telas maiores -->
        <nav class="d-none d-md-flex gap-3">
          <router-link to="/" class="nav-link text-white">Início</router-link>
          <router-link to="/cadastrar" class="nav-link text-white">Cadastrar Currículo</router-link>
          <router-link to="/curriculos" class="nav-link text-white">Ver Currículos</router-link>
        </nav>

        <!-- Botão do menu hambúrguer para telas menores -->
        <button
          class="btn btn-primary d-md-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasMenu"
          aria-controls="offcanvasMenu"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>

      <!-- Menu hambúrguer Offcanvas -->
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasMenu"
        aria-labelledby="offcanvasMenuLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasMenuLabel">Menu</h5>
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body d-flex flex-column gap-3">
          <router-link
            to="/"
            class="nav-link text-primary fs-5"
            @click="fecharMenu"
          >
            Início
          </router-link>
          <router-link
            to="/cadastrar"
            class="nav-link text-primary fs-5"
            @click="fecharMenu"
          >
            Cadastrar Currículo
          </router-link>
          <router-link
            to="/curriculos"
            class="nav-link text-primary fs-5"
            @click="fecharMenu"
          >
            Ver Currículos
          </router-link>
        </div>
      </div>
    </header>

    <!-- Conteúdo Principal -->
    <main class="container my-5 pt-5">
      <router-view />
    </main>

    <!-- Rodapé -->
    <footer class="bg-dark text-white py-4 mt-auto">
      <div class="container text-center">
        <p class="mb-1">© 2024 Sistema de Currículos</p>
        <p class="mb-3">Entre em contato conosco:</p>
        <div class="d-flex justify-content-center gap-3">
          <a href="mailto:vzion435@gmail.com" class="text-warning">
            <font-awesome-icon :icon="['fas', 'envelope']" /> Email
          </a>
          <a href="#" class="text-warning">
            <font-awesome-icon :icon="['fas', 'phone']" /> Telefone
          </a>
          <a href="#" class="text-warning">
            <font-awesome-icon :icon="['fab', 'linkedin']" /> LinkedIn
          </a>
          <a href="https://github.com/VictorZionFranca" target="_blank" class="text-warning">
            <font-awesome-icon :icon="['fab', 'github']" /> GitHub
          </a>
          <a href="#" class="text-warning">
            <font-awesome-icon :icon="['fab', 'instagram']" /> Instagram
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import * as bootstrap from 'bootstrap';
export default {
  name: 'App',
  methods: {
    fecharMenu() {
      const menuOffcanvas = bootstrap.Offcanvas.getInstance(
        document.getElementById('offcanvasMenu')
      );
      if (menuOffcanvas) {
        menuOffcanvas.hide(); // Fecha o menu offcanvas
      }
    },
  },
};
</script>

<style scoped>
/* Customizações adicionais */
.nav-link:hover {
  text-decoration: underline;
}

/* Adiciona espaço no topo para evitar que o conteúdo seja sobreposto pelo header fixo */
main {
  margin-top: 70px;
  /* Altere conforme a altura do header */
}

/* Corrige o ícone do botão hambúrguer no Bootstrap 5 */
.navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba%28255, 255, 255, 1%29' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}
</style>

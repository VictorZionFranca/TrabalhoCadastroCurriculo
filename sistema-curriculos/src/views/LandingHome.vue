<template>
  <div class="landing-container text-center">
    <!-- Cabeçalho da Landing Page -->
    <header class="bg-primary text-light py-5">
      <div class="container">
        <h1 class="display-4 fw-bold">Bem-vindo ao Sistema de Currículos</h1>
        <p class="lead mt-3">
          Simplifique a gestão de currículos para a sua equipe. Armazene, visualize e gerencie informações de forma prática e eficiente.
        </p>
        <router-link to="/cadastrar" class="btn btn-light btn-lg mt-4">
          Comece Agora
        </router-link>
      </div>
    </header>

    <!-- Sessões da Landing Page -->
    <section class="features py-5">
      <div class="container">
        <h2 class="mb-5 text-primary fw-bold">Como Funciona?</h2>
        <div class="row text-start">
          <div class="col-md-4 mb-4">
            <div class="feature-card p-3 border rounded shadow">
              <h3 class="h5 text-primary"><font-awesome-icon :icon="['fas', 'user-plus']" /> Cadastro de Currículos</h3>
              <p class="mt-3">
                Cadastre currículos detalhados com informações como experiência profissional, formação acadêmica, habilidades e muito mais.
              </p>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="feature-card p-3 border rounded shadow">
              <h3 class="h5 text-primary"><font-awesome-icon :icon="['far', 'eye']" /> Visualização</h3>
              <p class="mt-3">
                Consulte currículos cadastrados em um layout organizado e fácil de navegar, com a possibilidade de edição e exclusão.
              </p>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="feature-card p-3 border rounded shadow">
              <h3 class="h5 text-primary"><font-awesome-icon :icon="['far', 'pen-to-square']" /> Gerenciamento</h3>
              <p class="mt-3">
                Atualize ou exclua currículos diretamente na plataforma, mantendo seus dados sempre organizados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Destaques e Benefícios -->
    <section class="testimonials bg-light py-5">
      <div class="container">
        <h2 class="mb-5 text-primary fw-bold">Por que Usar o Sistema de Currículos?</h2>
        <div class="row">
          <div class="col-md-6">
            <blockquote class="blockquote border-start ps-3">
              <p class="mb-3">
                "Este sistema facilitou o processo de gestão de currículos na minha empresa. Agora, economizamos tempo e otimizamos a seleção."
              </p>
              <footer class="blockquote-footer">Ana Souza, Gerente de RH</footer>
            </blockquote>
          </div>
          <div class="col-md-6">
            <blockquote class="blockquote border-start ps-3">
              <p class="mb-3">
                "Finalmente, encontrei uma solução prática para centralizar os currículos da minha equipe de forma segura."
              </p>
              <footer class="blockquote-footer">Carlos Lima, Coordenador de Projetos</footer>
            </blockquote>
          </div>
        </div>

        <!-- Novos Benefícios -->
        <div class="row mt-5">
          <div class="col-md-4 mb-4">
            <div class="benefit-card p-3 border rounded shadow">
              <h4 class="h6 text-primary"><font-awesome-icon :icon="['fas', 'lock']" /> Segurança dos Dados</h4>
              <p class="mt-2">
                Seus dados estão seguros em um ambiente, garantindo confidencialidade e privacidade.
              </p>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="benefit-card p-3 border rounded shadow">
              <h4 class="h6 text-primary"><font-awesome-icon :icon="['fas', 'mobile-screen']" /> Responsividade</h4>
              <p class="mt-2">
                Acesse o sistema de qualquer dispositivo, seja no computador, tablet ou smartphone.
              </p>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="benefit-card p-3 border rounded shadow">
              <h4 class="h6 text-primary"><font-awesome-icon :icon="['fas', 'chart-line']" /> Eficiência</h4>
              <p class="mt-2">
                Otimize o fluxo de trabalho da sua equipe, com ferramentas fáceis de usar e altamente eficientes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'LandingHome',
};
</script>

<style scoped>
/* Sessões */
.features .feature-card,
.benefit-card {
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.features .feature-card:hover,
.benefit-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* Depoimentos */
blockquote {
  font-size: 1.1rem;
  font-style: italic;
}

blockquote .blockquote-footer {
  font-size: 0.9rem;
}

/* Responsividade */
@media (max-width: 768px) {
  .features,
  .testimonials {
    text-align: center;
  }
}
</style>
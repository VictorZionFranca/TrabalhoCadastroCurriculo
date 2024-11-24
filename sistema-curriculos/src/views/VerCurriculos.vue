<template>
  <div class="curriculos-container">
    <h1>Lista de Currículos</h1>
    <div class="curriculo-card" v-for="curriculo in curriculos" :key="curriculo._id">
      <div class="curriculo-header">
        <h2>{{ curriculo.nome }}</h2>
        <p><strong>Email:</strong> {{ curriculo.email }}</p>
        <p><strong>Telefone:</strong> {{ curriculo.telefone }}</p>
        <p><strong>Endereço:</strong> {{ curriculo.endereco }}</p>
      </div>
      <div class="curriculo-section">
        <h3>Formação Acadêmica</h3>
        <div v-for="(formacao, index) in curriculo.formacao" :key="index" class="formacao-item">
          <p><strong>Curso:</strong> {{ formacao.curso }}</p>
          <p><strong>Instituição:</strong> {{ formacao.instituicao }}</p>
          <p><strong>Ano de Conclusão:</strong> {{ formacao.ano }}</p>
        </div>
      </div>
      <div class="curriculo-section">
        <h3>Experiência Profissional</h3>
        <div v-for="(experiencia, index) in curriculo.experiencia" :key="index" class="experiencia-item">
          <p><strong>Empresa:</strong> {{ experiencia.empresa }}</p>
          <p><strong>Cargo:</strong> {{ experiencia.cargo }}</p>
          <p><strong>Período:</strong> {{ experiencia.periodo }}</p>
        </div>
      </div>
      <div class="curriculo-section">
        <h3>Habilidades</h3>
        <ul>
          <li v-for="(habilidade, index) in curriculo.habilidades" :key="index">{{ habilidade }}</li>
        </ul>
      </div>
      <div class="curriculo-section">
        <h3>Idiomas</h3>
        <ul>
          <li v-for="(idioma, index) in curriculo.idiomas" :key="index">{{ idioma }}</li>
        </ul>
      </div>
      <div class="curriculo-section">
        <h3>Objetivo Profissional</h3>
        <p>{{ curriculo.objetivo }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'VerCurriculos',
  data() {
    return {
      curriculos: [] // Lista para armazenar currículos carregados do backend
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:5000/curriculos');
      this.curriculos = response.data;
    } catch (error) {
      console.error('Erro ao carregar os currículos:', error);
    }
  }
};
</script>

<style scoped>
.curriculos-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.curriculo-card {
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.curriculo-card h2 {
  margin-bottom: 5px;
  font-size: 1.5rem;
}

.curriculo-header p {
  margin: 5px 0;
}

.curriculo-section {
  margin-top: 20px;
}

.curriculo-section h3 {
  margin-bottom: 10px;
  color: #007bff;
}

ul {
  list-style: none;
  padding: 0;
}

ul li {
  margin-bottom: 10px;
}

p {
  line-height: 1.6;
}
</style>

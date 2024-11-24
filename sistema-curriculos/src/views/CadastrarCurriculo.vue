<template>
    <div>
      <h1>Cadastrar Currículo</h1>
      <form @submit.prevent="submitForm">
        <input v-model="curriculo.nome" placeholder="Nome completo" required />
        <input v-model="curriculo.email" type="email" placeholder="Email" required />
        <input v-model="curriculo.telefone" placeholder="Telefone" required />
        <!-- Adicione outros campos aqui -->
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        curriculo: {
          nome: '',
          email: '',
          telefone: '',
          // Adicione os demais campos aqui
        }
      };
    },
    methods: {
      async submitForm() {
        try {
          await axios.post('http://localhost:5000/curriculos', this.curriculo);
          alert('Currículo cadastrado com sucesso!');
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  </script>
  
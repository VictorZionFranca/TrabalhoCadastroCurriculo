<template>
    <div>
      <h1>Lista de Currículos</h1>
      <div v-for="curriculo in curriculos" :key="curriculo._id">
        <h2>{{ curriculo.nome }}</h2>
        <p>Email: {{ curriculo.email }}</p>
        <!-- Mostre outros campos aqui -->
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        curriculos: [],
      };
    },
    async mounted() {
      try {
        const response = await axios.get('http://localhost:5000/curriculos');
        this.curriculos = response.data;
      } catch (error) {
        console.error(error);
      }
    }
  };
  </script>
  
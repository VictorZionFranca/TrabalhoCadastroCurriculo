<template>
    <div class="form-container">
      <h2>Cadastrar Currículo</h2>
      <form @submit.prevent="enviarFormulario">
        <div class="mb-3">
          <label for="nome" class="form-label">Nome completo</label>
          <input type="text" id="nome" v-model="curriculo.nome" class="form-control" required />
        </div>
  
        <div class="mb-3">
          <label for="email" class="form-label">E-mail</label>
          <input type="email" id="email" v-model="curriculo.email" class="form-control" required />
          <div v-if="emailInvalido" class="text-danger">E-mail inválido!</div>
        </div>
  
        <div class="mb-3">
          <label for="telefone" class="form-label">Telefone</label>
          <input v-mask="'(##) #####-####'" v-model="curriculo.telefone" id="telefone" type="text" class="form-control" required />
          <div v-if="errors.telefone" class="text-danger">{{ errors.telefone }}</div>
        </div>
  
        <div class="mb-3">
          <label for="endereco" class="form-label">Endereço completo</label>
          <input type="text" id="endereco" v-model="curriculo.endereco" class="form-control" required />
        </div>
  
        <div class="mb-3">
          <label for="formacao" class="form-label">Formação acadêmica</label>
          <input type="text" v-model="curriculo.formacao.curso" placeholder="Curso" class="form-control" required />
          <input type="text" v-model="curriculo.formacao.instituicao" placeholder="Instituição" class="form-control" required />
          <input type="number" v-model="curriculo.formacao.ano" placeholder="Ano de conclusão" class="form-control" required />
        </div>
  
        <div class="mb-3">
          <label for="experiencia" class="form-label">Experiência profissional</label>
          <input type="text" v-model="curriculo.experiencia.empresa" placeholder="Empresa" class="form-control" required />
          <input type="text" v-model="curriculo.experiencia.cargo" placeholder="Cargo" class="form-control" required />
          <input type="text" v-model="curriculo.experiencia.periodo" placeholder="Período" class="form-control" required />
        </div>
  
        <div class="mb-3">
          <label for="habilidades" class="form-label">Habilidades</label>
          <textarea v-model="curriculo.habilidades" placeholder="Liste suas habilidades" class="form-control" required></textarea>
        </div>
  
        <div class="mb-3">
          <label for="idiomas" class="form-label">Idiomas</label>
          <input type="text" v-model="curriculo.idiomas" placeholder="Ex: Inglês, Espanhol" class="form-control" required />
        </div>
  
        <div class="mb-3">
          <label for="objetivo" class="form-label">Objetivo profissional</label>
          <textarea v-model="curriculo.objetivo" placeholder="Seu objetivo profissional" class="form-control" required></textarea>
        </div>
  
        <button type="submit" class="btn btn-primary w-100">Cadastrar</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'CadastrarCurriculo',
    data() {
      return {
        curriculo: {
          nome: '',
          email: '',
          telefone: '',
          endereco: '',
          formacao: {
            curso: '',
            instituicao: '',
            ano: ''
          },
          experiencia: {
            empresa: '',
            cargo: '',
            periodo: ''
          },
          habilidades: '',
          idiomas: '',
          objetivo: ''
        },
        errors: {
          telefone: ''
        }
      };
    },
    computed: {
      emailInvalido() {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return this.curriculo.email && !emailRegex.test(this.curriculo.email);
      }
    },
    methods: {
      validarTelefone() {
        const telefoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;
  
        if (!telefoneRegex.test(this.curriculo.telefone)) {
          this.errors.telefone = 'O número de telefone deve estar no formato (XX) XXXXX-XXXX';
          return false;
        }
  
        this.errors.telefone = '';
        return true;
      },
  
      validarFormulario() {
        let isValid = true;
  
        if (!this.validarTelefone()) {
          isValid = false;
        }
  
        if (this.emailInvalido) {
          isValid = false;
        }
  
        return isValid;
      },
  
      async enviarFormulario() {
        if (this.validarFormulario()) {
          try {
            const response = await axios.post('http://localhost:5000/curriculos', this.curriculo, {
              headers: { 'Content-Type': 'application/json' }
            });
            console.log('Currículo cadastrado com sucesso:', response.data);
            alert('Currículo cadastrado com sucesso!');
            this.resetarFormulario();
          } catch (error) {
            console.error('Erro ao enviar o formulário:', error);
            alert('Erro ao cadastrar currículo. Verifique os dados e tente novamente.');
          }
        } else {
          alert('Erro na validação. Verifique os campos e tente novamente.');
        }
      },
  
      resetarFormulario() {
        this.curriculo = {
          nome: '',
          email: '',
          telefone: '',
          endereco: '',
          formacao: {
            curso: '',
            instituicao: '',
            ano: ''
          },
          experiencia: {
            empresa: '',
            cargo: '',
            periodo: ''
          },
          habilidades: '',
          idiomas: '',
          objetivo: ''
        };
      }
    }
  };
  </script>
  
  <style scoped>
  .form-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: white;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  </style>  
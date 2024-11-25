<template>
  <div class="form-container">
    <h2>Cadastrar Currículo</h2>
    <form @submit.prevent="enviarFormulario">
      <!-- Nome -->
      <div class="mb-3">
        <label for="nome" class="form-label">Nome completo</label>
        <input type="text" id="nome" v-model="curriculo.nome" class="form-control" required />
      </div>

      <!-- Email -->
      <div class="mb-3">
        <label for="email" class="form-label">E-mail</label>
        <input type="email" id="email" v-model="curriculo.email" class="form-control" required />
        <div v-if="emailInvalido" class="text-danger">E-mail inválido!</div>
      </div>

      <!-- Telefone -->
      <div class="mb-3">
        <label for="telefone" class="form-label">Telefone</label>
        <input v-mask="'(##) #####-####'" v-model="curriculo.telefone" id="telefone" type="text" class="form-control"
          required />
        <div v-if="errors.telefone" class="text-danger">{{ errors.telefone }}</div>
      </div>

      <!-- Endereço -->
      <div class="mb-3">
        <label for="endereco" class="form-label">Endereço completo</label>
        <input type="text" id="endereco" v-model="curriculo.endereco" class="form-control" required />
      </div>

      <!-- Formação Acadêmica -->
      <div class="mb-3">
        <label for="formacao" class="form-label">Formação acadêmica</label>
        <div v-for="(formacao, index) in curriculo.formacao" :key="index" class="mb-3">
          <div class="input-group">
            <input type="text" class="form-control me-2" placeholder="Curso" v-model="formacao.curso" required />
            <input type="text" class="form-control me-2" placeholder="Instituição" v-model="formacao.instituicao"
              required />
            <input type="number" class="form-control" placeholder="Ano de conclusão" v-model="formacao.ano" required />
          </div>
          <button type="button" class="btn btn-danger btn-sm mt-2" @click="removerFormacao(index)">Remover</button>
        </div>
        <button type="button" class="btn btn-secondary mb-3" @click="adicionarFormacao">Adicionar Formação</button>
      </div>

      <!-- Experiência Profissional -->
      <div class="mb-3">
        <label for="experiencia" class="form-label">Experiência profissional</label>
        <div v-for="(experiencia, index) in curriculo.experiencia" :key="index" class="mb-3">
          <div class="input-group">
            <input type="text" class="form-control me-2" placeholder="Empresa" v-model="experiencia.empresa" required />
            <input type="text" class="form-control me-2" placeholder="Cargo" v-model="experiencia.cargo" required />
            <input type="text" class="form-control" placeholder="Período" v-model="experiencia.periodo" required />
          </div>
          <button type="button" class="btn btn-danger btn-sm mt-2" @click="removerExperiencia(index)">Remover</button>
        </div>
        <button type="button" class="btn btn-secondary mb-3" @click="adicionarExperiencia">Adicionar
          Experiência</button>
      </div>

      <!-- Habilidades -->
      <div class="mb-3">
        <label for="habilidades" class="form-label">Habilidades</label>
        <textarea v-model="curriculo.habilidades" placeholder="Liste suas habilidades" class="form-control"
          required></textarea>
      </div>

      <!-- Idiomas -->
      <div class="mb-3">
        <label for="idiomas" class="form-label">Idiomas</label>
        <input type="text" v-model="curriculo.idiomas" placeholder="Ex: Inglês, Espanhol" class="form-control" />
      </div>

      <!-- Objetivo Profissional -->
      <div class="mb-3">
        <label for="objetivo" class="form-label">Objetivo profissional</label>
        <textarea v-model="curriculo.objetivo" placeholder="Seu objetivo profissional" class="form-control"
          required></textarea>
      </div>

      <!-- Botão de Cadastro -->
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
        formacao: [{ curso: '', instituicao: '', ano: '' }], // Array para múltiplas formações
        experiencia: [{ empresa: '', cargo: '', periodo: '' }], // Array para múltiplas experiências
        habilidades: '',
        idiomas: '',
        objetivo: '',
      },
      errors: {
        telefone: '',
        email: '',
      },
    };
  },
  computed: {
    emailInvalido() {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return this.curriculo.email && !emailRegex.test(this.curriculo.email);
    },
  },
  methods: {
    adicionarFormacao() {
      this.curriculo.formacao.push({ curso: '', instituicao: '', ano: '' });
    },
    removerFormacao(index) {
      this.curriculo.formacao.splice(index, 1);
    },
    adicionarExperiencia() {
      this.curriculo.experiencia.push({ empresa: '', cargo: '', periodo: '' });
    },
    removerExperiencia(index) {
      this.curriculo.experiencia.splice(index, 1);
    },
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
      let valido = true;

      // Validar nome
      if (!this.curriculo.nome) {
        alert('O campo "Nome" é obrigatório.');
        valido = false;
      }

      // Validar email
      if (this.emailInvalido) {
        this.errors.email = 'O email é inválido.';
        alert(this.errors.email);
        valido = false;
      } else {
        this.errors.email = '';
      }

      // Validar telefone
      if (!this.validarTelefone()) {
        valido = false;
      }

      // Validar habilidades
      if (!this.curriculo.habilidades) {
        alert('O campo "Habilidades" é obrigatório.');
        valido = false;
      }

      return valido;
    },
    async enviarFormulario() {
      if (this.validarFormulario()) {
        try {
          const response = await axios.post('http://localhost:5000/curriculos', this.curriculo, {
            headers: { 'Content-Type': 'application/json' },
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
        formacao: [{ curso: '', instituicao: '', ano: '' }],
        experiencia: [{ empresa: '', cargo: '', periodo: '' }],
        habilidades: '',
        idiomas: '',
        objetivo: '',
      };
      this.errors = {
        telefone: '',
        email: '',
      };
    },
  },
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
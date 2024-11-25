<template>
  <div class="curriculos-container">
    <h1 class="text-center mb-5">Lista de Currículos</h1>

    <div class="curriculo-card" v-for="curriculo in curriculos" :key="curriculo._id">
      <!-- Nome e botões -->
      <div class="curriculo-header text-center">
        <h2 class="text-primary">{{ curriculo.nome }}</h2>
        <hr class="mb-0">
      </div>

      <!-- Informações do currículo -->
      <div class="row">
        <!-- Coluna da esquerda -->
        <div class="col-12 col-md-9">
          <section class="curriculo-section">
            <h3 class="section-title">Objetivo Profissional</h3>
            <p>{{ curriculo.objetivo }}</p>
          </section>

          <section class="curriculo-section">
            <h3 class="section-title">Experiência Profissional</h3>
            <div v-for="(experiencia, index) in curriculo.experiencia" :key="index">
              <p><strong>Empresa:</strong> {{ experiencia.empresa }}</p>
              <p><strong>Cargo:</strong> {{ experiencia.cargo }}</p>
              <p><strong>Período:</strong> {{ experiencia.periodo }}</p>
            </div>
          </section>

          <section class="curriculo-section">
            <h3 class="section-title">Formação Acadêmica</h3>
            <div v-for="(formacao, index) in curriculo.formacao" :key="index">
              <p><strong>Curso:</strong> {{ formacao.curso }}</p>
              <p><strong>Instituição:</strong> {{ formacao.instituicao }}</p>
              <p><strong>Ano de Conclusão:</strong> {{ formacao.ano }}</p>
            </div>
          </section>
        </div>

        <!-- Coluna da direita -->
        <div class="col-12 col-md-3 azul rounded">
          <section class="curriculo-section">
            <h3 class="section-title text-light">Contato</h3>
            <ul class="list-unstyled text-light">
              <li><strong>Email:</strong> {{ curriculo.email }}</li>
              <li><strong>Telefone:</strong> {{ curriculo.telefone }}</li>
              <li><strong>Endereço:</strong> {{ curriculo.endereco }}</li>
            </ul>
          </section>

          <section class="curriculo-section">
            <h3 class="section-title text-light">Habilidades</h3>
            <ul class="list-unstyled text-light">
              <!-- Verifica se habilidades é uma string ou array -->
              <li
                v-for="(habilidade, index) in Array.isArray(curriculo.habilidades) ? curriculo.habilidades : curriculo.habilidades.split(',')"
                :key="index">
                {{ habilidade.trim() }}
              </li>
            </ul>
          </section>

          <section class="curriculo-section">
            <h3 class="section-title text-light">Idiomas</h3>
            <ul class="list-unstyled text-light">
              <!-- Verifica se idiomas é uma string ou array -->
              <li
                v-for="(idioma, index) in Array.isArray(curriculo.idiomas) ? curriculo.idiomas : curriculo.idiomas.split(',')"
                :key="index">
                {{ idioma.trim() }}
              </li>
            </ul>
          </section>

        </div>
        <div class="text-center">
          <hr class="mt-0">
          <button class="btn btn-warning btn-sm mr-2" data-bs-toggle="modal" data-bs-target="#editarCurriculoModal"
            @click="prepararEdicao(curriculo)">
            Editar
          </button>
          <button class="btn btn-danger btn-sm" @click="excluirCurriculo(curriculo._id)">Excluir</button>
        </div>
      </div>
    </div>

    <!-- Modal de Edição -->
    <div class="modal fade" id="editarCurriculoModal" tabindex="-1" aria-labelledby="editarCurriculoModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editarCurriculoModalLabel">Editar Currículo</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="editarCurriculo">
              <div class="form-group mb-3">
                <label for="nome">Nome</label>
                <input type="text" id="nome" class="form-control" v-model="curriculoEditado.nome" required />
              </div>
              <div class="form-group mb-3">
                <label for="email">Email</label>
                <input type="email" id="email" class="form-control" v-model="curriculoEditado.email" required />
              </div>
              <div class="form-group mb-3">
                <label for="telefone">Telefone</label>
                <input type="text" id="telefone" class="form-control" v-model="curriculoEditado.telefone" required />
              </div>
              <div class="form-group mb-3">
                <label for="endereco">Endereço</label>
                <input type="text" id="endereco" class="form-control" v-model="curriculoEditado.endereco" required />
              </div>
              <div class="form-group mb-3">
                <label for="objetivo">Objetivo Profissional</label>
                <textarea id="objetivo" class="form-control" v-model="curriculoEditado.objetivo" required></textarea>
              </div>
              <!-- Formações -->
              <div class="form-group mb-3" v-for="(formacao, index) in curriculoEditado.formacao" :key="index">
                <label for="curso">Curso</label>
                <input type="text" class="form-control mb-3" v-model="formacao.curso" required />
                <label for="instituicao">Instituição</label>
                <input type="text" class="form-control mb-3" v-model="formacao.instituicao" required />
                <label for="ano">Ano de Conclusão</label>
                <input type="number" class="form-control mb-3" v-model="formacao.ano" required />
              </div>
              <!-- Experiência -->
              <div class="form-group mb-3" v-for="(experiencia, index) in curriculoEditado.experiencia" :key="index">
                <label for="empresa">Empresa</label>
                <input type="text" class="form-control mb-3" v-model="experiencia.empresa" required />
                <label for="cargo">Cargo</label>
                <input type="text" class="form-control mb-3" v-model="experiencia.cargo" required />
                <label for="periodo">Período</label>
                <input type="text" class="form-control mb-3" v-model="experiencia.periodo" required />
              </div>

              <div class="form-group mb-3">
                <label for="habilidades">Habilidades</label>
                <!-- Se estiver editando, converte a string em array ou usa diretamente um array -->
                <textarea class="form-control" v-model="curriculoEditado.habilidades" required></textarea>
              </div>

              <div class="form-group mb-3">
                <label for="idiomas">Idiomas</label>
                <textarea class="form-control" v-model="curriculoEditado.idiomas" required></textarea>
              </div>

              <!-- Botões -->
              <div class="d-flex justify-content-center gap-4">
                <button type="submit" class="btn btn-primary">Salvar Alterações</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import * as bootstrap from 'bootstrap'; // Importa todas as funcionalidades do Bootstrap

export default {
  name: 'VerCurriculos',
  data() {
    return {
      curriculos: [], // Lista de currículos
      curriculoEditado: {} // Currículo em edição
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:5000/curriculos');
      this.curriculos = response.data;
    } catch (error) {
      console.error('Erro ao carregar os currículos:', error);
    }
  },
  methods: {
    prepararEdicao(curriculo) {
      this.curriculoEditado = { ...curriculo }; // Clona os dados do currículo
    },
    async editarCurriculo() {
      try {
        // Converte as habilidades e idiomas em arrays, se forem strings
        if (typeof this.curriculoEditado.habilidades === 'string') {
          this.curriculoEditado.habilidades = this.curriculoEditado.habilidades.split(',');
        }

        if (typeof this.curriculoEditado.idiomas === 'string') {
          this.curriculoEditado.idiomas = this.curriculoEditado.idiomas.split(',');
        }

        await axios.put(`http://localhost:5000/curriculos/${this.curriculoEditado._id}`, this.curriculoEditado);
        const index = this.curriculos.findIndex(c => c._id === this.curriculoEditado._id);
        this.curriculos[index] = { ...this.curriculoEditado };
        alert('Currículo atualizado com sucesso!');
        // Fecha o modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('editarCurriculoModal'));
        if (modal) modal.hide();
      } catch (error) {
        console.error('Erro ao editar currículo:', error);
        alert('Erro ao atualizar o currículo.');
      }
    },
    async excluirCurriculo(id) {
      if (confirm('Tem certeza que deseja excluir este currículo?')) {
        try {
          await axios.delete(`http://localhost:5000/curriculos/${id}`);
          this.curriculos = this.curriculos.filter(curriculo => curriculo._id !== id); // Remove da lista local
          alert('Currículo excluído com sucesso!');
        } catch (error) {
          console.error('Erro ao excluir currículo:', error);
          alert('Erro ao excluir o currículo.');
        }
      }
    }
  }
};
</script>

<style scoped>
.curriculos-container {
  max-width: 950px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.curriculo-card {
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.curriculo-header h2 {
  font-size: 2rem;
  font-weight: bold;
}

.section-title {
  font-size: 1.5rem;
  color: #007bff;
  margin-bottom: 10px;
  font-weight: bold;
}

.btn-warning {
  margin-right: 10px;
}

.curriculo-section {
  margin-top: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

ul li {
  font-size: 1rem;
  line-height: 1.6;
}

p {
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
}

.text-md-right {
  text-align: right;
}

.azul {
  background-color: #007bff;
}

@media (max-width: 767px) {
  .curriculo-header h2 {
    font-size: 1.5rem;
  }

  .section-title {
    font-size: 1.2rem;
  }

  .curriculo-card {
    padding: 15px;
  }
}

.curriculo-card {
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  /* Adiciona esta regra para evitar estouro horizontal */
  overflow-wrap: break-word;
  /* Quebra palavras muito longas */
  word-wrap: break-word;
  /* Compatibilidade com navegadores antigos */
  word-break: break-word;
  /* Quebra o texto, se necessário */
}
</style>
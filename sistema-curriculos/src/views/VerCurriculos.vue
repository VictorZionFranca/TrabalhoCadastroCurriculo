<template>
  <div class="curriculos-container">
    <h1 class="text-center mb-5">Lista de Currículos</h1>

    <!-- Miniaturas dos currículos -->
    <div class="row">
      <div class="col-12 col-md-6 col-lg-4 mb-4" v-for="curriculo in curriculos" :key="curriculo._id">
        <div class="curriculo-miniatura">
          <h3 class="text-primary text-center">{{ curriculo.nome }}</h3>
          <p class="text-center">{{ curriculo.objetivo }}</p>
          <div class="miniatura-overlay">
            <button class="btn btn-primary" @click="abrirDetalhes(curriculo)">
              Ver Detalhes
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Detalhes -->
    <div class="modal fade" id="detalhesCurriculoModal" tabindex="-1" aria-labelledby="detalhesCurriculoModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- Layout completo do currículo -->
            <div class="curriculo-card">
              <div class="curriculo-header text-center">
                <h2 class="text-primary">{{ curriculoSelecionado.nome }}</h2>
                <hr class="mb-0" />
              </div>
              <div class="row">
                <div class="col-12 col-md-9">
                  <section class="curriculo-section">
                    <h3 class="section-title">Objetivo Profissional</h3>
                    <p>{{ curriculoSelecionado.objetivo }}</p>
                  </section>
                  <section class="curriculo-section"
                    v-if="curriculoSelecionado.experiencia && curriculoSelecionado.experiencia.length">
                    <h3 class="section-title">Experiência Profissional</h3>
                    <div v-for="(exp, index) in curriculoSelecionado.experiencia" :key="index">
                      <p><strong>Empresa:</strong> {{ exp.empresa }}</p>
                      <p><strong>Cargo:</strong> {{ exp.cargo }}</p>
                      <p><strong>Período:</strong> {{ exp.periodo }}</p>
                    </div>
                  </section>

                  <section class="curriculo-section"
                    v-if="curriculoSelecionado.formacao && curriculoSelecionado.formacao.length">
                    <h3 class="section-title">Formação Acadêmica</h3>
                    <div v-for="(form, index) in curriculoSelecionado.formacao" :key="index">
                      <p><strong>Curso:</strong> {{ form.curso }}</p>
                      <p><strong>Instituição:</strong> {{ form.instituicao }}</p>
                      <p><strong>Ano de Conclusão:</strong> {{ form.ano }}</p>
                    </div>
                  </section>

                </div>
                <div class="col-12 col-md-3 azul rounded">
                  <section class="curriculo-section">
                    <h3 class="section-title text-light">Contato</h3>
                    <ul class="list-unstyled text-light">
                      <li><strong>Email:</strong> {{ curriculoSelecionado.email }}</li>
                      <li><strong>Telefone:</strong> {{ curriculoSelecionado.telefone }}</li>
                      <li><strong>Endereço:</strong> {{ curriculoSelecionado.endereco }}</li>
                    </ul>
                  </section>
                  <section class="curriculo-section">
                    <h3 class="section-title text-light">Habilidades</h3>
                    <ul class="list-unstyled text-light">
                      <li v-for="(habilidade, index) in habilidadesArray" :key="index">
                        {{ habilidade.trim() }}
                      </li>
                    </ul>
                  </section>
                  <section class="curriculo-section">
                    <h3 class="section-title text-light">Idiomas</h3>
                    <ul class="list-unstyled text-light">
                      <li v-for="(idioma, index) in idiomasArray" :key="index">
                        {{ idioma.trim() }}
                      </li>
                    </ul>
                  </section>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer justify-content-center">
            <!-- Botões para editar e excluir -->
            <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editarCurriculoModal"
              @click="prepararEdicao(curriculoSelecionado)">
              Editar
            </button>
            <button type="button" class="btn btn-danger" @click="prepararExclusao(curriculoSelecionado)">
              Excluir
            </button>
          </div>
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
              <!-- Nome -->
              <div class="form-group mb-3">
                <label for="nome">Nome</label>
                <input type="text" id="nome" class="form-control" v-model="curriculoEditado.nome" required />
              </div>

              <!-- Email -->
              <div class="form-group mb-3">
                <label for="email">Email</label>
                <input type="email" id="email" class="form-control" v-model="curriculoEditado.email" required />
              </div>

              <!-- Telefone -->
              <div class="form-group mb-3">
                <label for="telefone">Telefone</label>
                <input type="text" id="telefone" class="form-control" v-model="curriculoEditado.telefone" required />
              </div>

              <!-- Endereço -->
              <div class="form-group mb-3">
                <label for="endereco">Endereço</label>
                <input type="text" id="endereco" class="form-control" v-model="curriculoEditado.endereco" required />
              </div>

              <!-- Objetivo Profissional -->
              <div class="form-group mb-3">
                <label for="objetivo">Objetivo Profissional</label>
                <textarea id="objetivo" class="form-control" v-model="curriculoEditado.objetivo" required></textarea>
              </div>

              <!-- Formação Acadêmica -->
              <div class="form-group mb-3">
                <label>Formação Acadêmica</label>
                <div v-for="(formacao, index) in curriculoEditado.formacao" :key="index" class="mb-3">
                  <div class="input-group">
                    <input type="text" class="form-control me-2" placeholder="Curso" v-model="formacao.curso"
                      required />
                    <input type="text" class="form-control me-2" placeholder="Instituição"
                      v-model="formacao.instituicao" required />
                    <input type="number" class="form-control" placeholder="Ano de Conclusão" v-model="formacao.ano"
                      required />
                  </div>
                  <button type="button" class="btn btn-danger btn-sm mt-2"
                    @click="removerFormacao(index)">Remover</button>
                </div>
                <button type="button" class="btn btn-secondary" @click="adicionarFormacao">Adicionar Formação</button>
              </div>

              <!-- Experiência Profissional -->
              <div class="form-group mb-3">
                <label>Experiência Profissional</label>
                <div v-for="(experiencia, index) in curriculoEditado.experiencia" :key="index" class="mb-3">
                  <div class="input-group">
                    <input type="text" class="form-control me-2" placeholder="Empresa" v-model="experiencia.empresa"
                      required />
                    <input type="text" class="form-control me-2" placeholder="Cargo" v-model="experiencia.cargo"
                      required />
                    <input type="text" class="form-control" placeholder="Período" v-model="experiencia.periodo"
                      required />
                  </div>
                  <button type="button" class="btn btn-danger btn-sm mt-2"
                    @click="removerExperiencia(index)">Remover</button>
                </div>
                <button type="button" class="btn btn-secondary" @click="adicionarExperiencia">Adicionar
                  Experiência</button>
              </div>

              <!-- Habilidades -->
              <div class="form-group mb-3">
                <label for="habilidades">Habilidades</label>
                <textarea id="habilidades" class="form-control" v-model="curriculoEditado.habilidades"
                  placeholder="Separe as habilidades por vírgulas" required></textarea>
              </div>

              <!-- Idiomas -->
              <div class="form-group mb-3">
                <label for="idiomas">Idiomas</label>
                <textarea id="idiomas" class="form-control" v-model="curriculoEditado.idiomas"
                  placeholder="Separe os idiomas por vírgulas"></textarea>
              </div>

              <!-- Botões -->
              <div class="modal-footer justify-content-center">
                <button type="submit" class="btn btn-primary">Salvar Alterações</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal de Confirmação de Exclusão -->
    <div class="modal fade" id="confirmarExclusaoModal" tabindex="-1" aria-labelledby="confirmarExclusaoModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="confirmarExclusaoModalLabel">Confirmar Exclusão</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Tem certeza que deseja excluir este currículo?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-danger" @click="confirmarExclusao">Excluir</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast de Exclusão -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div id="sucessoToast" class="toast text-white bg-danger border-0" role="alert" aria-live="assertive"
        aria-atomic="true">
        <div class="toast-body text-center">
          <button type="button" class="btn-close btn-close-white float-end ms-2" data-bs-dismiss="toast"
            aria-label="Close"></button>
          <span>Currículo Excluído!</span>
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
      curriculoSelecionado: {}, // Currículo selecionado para ver os detalhes
      curriculoEditado: { // Currículo em edição
        formacao: [], // Inicializa o array de formação acadêmica
        experiencia: [] // Inicializa o array de experiência profissional
      },
      curriculoParaExcluir: null, // Currículo que será excluído
    };
  },
  computed: {
    habilidadesArray() {
      return typeof this.curriculoSelecionado.habilidades === "string"
        ? this.curriculoSelecionado.habilidades.split(",")
        : this.curriculoSelecionado.habilidades || [];
    },
    idiomasArray() {
      return typeof this.curriculoSelecionado.idiomas === "string"
        ? this.curriculoSelecionado.idiomas.split(",")
        : this.curriculoSelecionado.idiomas || [];
    },
  },
  async created() {
    await this.carregarCurriculos(); // Inicialmente carrega os currículos
  },
  methods: {
    async carregarCurriculos() {
      try {
        const response = await axios.get('http://localhost:5000/curriculos');
        this.curriculos = response.data; // Atualiza a lista com dados do servidor
      } catch (error) {
        console.error('Erro ao carregar os currículos:', error);
      }
    },
    abrirDetalhes(curriculo) {
      this.curriculoSelecionado = curriculo;
      const modal = new bootstrap.Modal(
        document.getElementById("detalhesCurriculoModal")
      );
      modal.show();
    },
    prepararEdicao(curriculo) {
      this.curriculoEditado = {
        ...curriculo,
        formacao: curriculo.formacao || [],
        experiencia: curriculo.experiencia || []
      };
    },
    async editarCurriculo() {
      try {
        if (typeof this.curriculoEditado.habilidades === 'string') {
          this.curriculoEditado.habilidades = this.curriculoEditado.habilidades.split(',').map(h => h.trim());
        }
        if (typeof this.curriculoEditado.idiomas === 'string') {
          this.curriculoEditado.idiomas = this.curriculoEditado.idiomas.split(',').map(i => i.trim());
        }

        await axios.put(`http://localhost:5000/curriculos/${this.curriculoEditado._id}`, this.curriculoEditado);
        const index = this.curriculos.findIndex(c => c._id === this.curriculoEditado._id);
        if (index !== -1) {
          this.curriculos.splice(index, 1, { ...this.curriculoEditado });
        }
        alert('Currículo atualizado com sucesso!');
        const modal = bootstrap.Modal.getInstance(document.getElementById('editarCurriculoModal'));
        if (modal) modal.hide();
      } catch (error) {
        console.error('Erro ao atualizar currículo:', error);
        alert('Erro ao salvar alterações.');
      }
    },
    prepararExclusao(curriculo) {
      if (curriculo && curriculo._id) {
        console.log("Currículo definido para exclusão:", curriculo);
        this.curriculoParaExcluir = curriculo;

        const modalDetalhes = bootstrap.Modal.getInstance(document.getElementById('detalhesCurriculoModal'));
        if (modalDetalhes) modalDetalhes.hide();

        const modalExclusao = new bootstrap.Modal(document.getElementById('confirmarExclusaoModal'));
        modalExclusao.show();
      } else {
        console.error("Erro: Currículo inválido ou ID ausente.");
        alert("Erro ao preparar a exclusão do currículo.");
      }
    },
    async confirmarExclusao() {
      try {
        if (!this.curriculoParaExcluir || !this.curriculoParaExcluir._id) {
          console.error("Currículo para excluir não está definido corretamente.");
          alert("Nenhum currículo foi selecionado para exclusão.");
          return;
        }

        console.log("Excluindo currículo:", this.curriculoParaExcluir);

        await axios.delete(`http://localhost:5000/curriculos/${this.curriculoParaExcluir._id}`);

        this.curriculos = this.curriculos.filter(curriculo => curriculo._id !== this.curriculoParaExcluir._id);

        this.curriculoParaExcluir = null;

        const modalExclusao = bootstrap.Modal.getInstance(document.getElementById('confirmarExclusaoModal'));
        if (modalExclusao) modalExclusao.hide();

        const toastEl = document.getElementById('sucessoToast');
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
      } catch (error) {
        console.error("Erro ao excluir currículo:", error);
        alert("Erro ao excluir o currículo.");
      }
    },
    async adicionarCurriculo(curriculo) {
      try {
        const response = await axios.post('http://localhost:5000/curriculos', curriculo);
        this.curriculos.push(response.data);
        alert('Currículo cadastrado com sucesso!');
      } catch (error) {
        console.error('Erro ao cadastrar currículo:', error);
        alert('Erro ao cadastrar o currículo.');
      }
    },
    adicionarFormacao() {
      this.curriculoEditado.formacao.push({ curso: '', instituicao: '', ano: '' });
    },
    removerFormacao(index) {
      this.curriculoEditado.formacao.splice(index, 1);
    },
    adicionarExperiencia() {
      this.curriculoEditado.experiencia.push({ empresa: '', cargo: '', periodo: '' });
    },
    removerExperiencia(index) {
      this.curriculoEditado.experiencia.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.curriculos-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  margin-bottom: 294px;
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

.curriculo-miniatura {
  position: relative;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease-in-out;
}

.curriculo-miniatura:hover {
  transform: translateY(-5px);
}

.miniatura-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 123, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-radius: 8px;
}

.curriculo-miniatura:hover .miniatura-overlay {
  opacity: 1;
}

.miniatura-overlay .btn {
  font-size: 1rem;
  padding: 10px 20px;
  color: white;
}
li, p {
  overflow-wrap: anywhere; /* Quebra as palavras em qualquer lugar necessário */
  white-space: normal;
}
</style>
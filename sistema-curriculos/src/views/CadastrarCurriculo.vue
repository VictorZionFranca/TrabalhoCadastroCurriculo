<template>
    <div class="form-container">
        <h2>Cadastrar Currículo</h2>
        <form @submit.prevent="enviarFormulario">
            <div class="form-group">
                <label for="nome">Nome completo</label>
                <input type="text" id="nome" v-model="curriculo.nome" required />
            </div>

            <div class="form-group">
                <label for="email">Endereço de e-mail</label>
                <input type="email" id="email" v-model="curriculo.email" required />
                <span v-if="emailInvalido" class="error">E-mail inválido!</span>
            </div>

            <div class="form-group">
                <label for="telefone">Telefone</label>
                <input v-mask="'(##) #####-####'" v-model="curriculo.telefone" id="telefone" type="text" required />
            </div>

            <div class="form-group">
                <label for="endereco">Endereço completo</label>
                <input type="text" id="endereco" v-model="curriculo.endereco" required />
            </div>

            <div class="form-group">
                <label for="formacao">Formação acadêmica</label>
                <input type="text" v-model="curriculo.formacao.curso" placeholder="Curso" required />
                <input type="text" v-model="curriculo.formacao.instituicao" placeholder="Instituição" required />
                <input type="number" v-model="curriculo.formacao.ano" placeholder="Ano de conclusão" required />
            </div>

            <div class="form-group">
                <label for="experiencia">Experiência profissional</label>
                <input type="text" v-model="curriculo.experiencia.empresa" placeholder="Empresa" required />
                <input type="text" v-model="curriculo.experiencia.cargo" placeholder="Cargo" required />
                <input type="text" v-model="curriculo.experiencia.periodo" placeholder="Período" required />
            </div>

            <div class="form-group">
                <label for="habilidades">Habilidades</label>
                <textarea v-model="curriculo.habilidades" placeholder="Liste suas habilidades" required></textarea>
            </div>

            <div class="form-group">
                <label for="idiomas">Idiomas</label>
                <input type="text" v-model="curriculo.idiomas" placeholder="Ex: Inglês, Espanhol" required />
            </div>

            <div class="form-group">
                <label for="objetivo">Objetivo profissional</label>
                <textarea v-model="curriculo.objetivo" placeholder="Seu objetivo profissional" required></textarea>
            </div>

            <button type="submit">Cadastrar</button>
        </form>
    </div>
</template>

<script>
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
            this.errors.telefone = ''; // Limpa o erro se o telefone for válido
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

        enviarFormulario() {
            if (this.validarFormulario()) {
                console.log('Formulário enviado:', this.curriculo);
            } else {
                console.log('Erro na validação');
            }
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
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    font-weight: bold;
}

input,
textarea {
    width: 100%;
    padding: 10px 5px;
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.error {
    color: red;
    font-size: 0.9rem;
    margin-top: 5px;
}
</style>
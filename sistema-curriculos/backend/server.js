const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Carregar variáveis de ambiente
require('dotenv').config();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rota para a raiz
app.get('/', (req, res) => {
  res.send('API de Currículos está funcionando!');
});

// Conexão com o MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Definição de modelo do currículo
const CurriculoSchema = new mongoose.Schema({
  nome: String,
  email: String,
  telefone: String,
  endereco: String,
  formacoes: [{ curso: String, instituicao: String, ano: String }], // Mudança para 'formacoes'
  experiencias: [{ empresa: String, cargo: String, periodo: String }], // Mudança para 'experiencias'
  habilidades: [String],
  idiomas: [String],
  objetivo: String
});

const Curriculo = mongoose.model('Curriculo', CurriculoSchema);

// Rotas CRUD
app.post('/curriculos', async (req, res) => {
  try {
    console.log('Dados recebidos do frontend:', req.body);  // Log para verificar o que está sendo enviado
    const novoCurriculo = new Curriculo(req.body);
    const resultado = await novoCurriculo.save();
    console.log('Resultado do MongoDB:', resultado);
    res.status(201).json(resultado);
  } catch (error) {
    console.error('Erro ao salvar no banco:', error);
    res.status(400).json({ error: error.message });
  }
});

app.get('/curriculos', async (req, res) => {
  try {
    const curriculos = await Curriculo.find();
    res.status(200).json(curriculos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/curriculos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Curriculo.findByIdAndDelete(id);
    res.status(200).json({ message: 'Currículo excluído com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir currículo.' });
  }
});

// Atualizar um currículo pelo ID
app.put('/curriculos/:id', async (req, res) => {
  try {
    const { id } = req.params; // ID do currículo a ser atualizado
    const dadosAtualizados = req.body; // Dados enviados pelo frontend

    const curriculoAtualizado = await Curriculo.findByIdAndUpdate(id, dadosAtualizados, {
      new: true, // Retorna o documento atualizado
      runValidators: true // Valida os dados antes de salvar
    });

    if (!curriculoAtualizado) {
      return res.status(404).json({ message: 'Currículo não encontrado.' });
    }

    res.status(200).json(curriculoAtualizado); // Retorna o currículo atualizado
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o currículo.', error: error.message });
  }
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
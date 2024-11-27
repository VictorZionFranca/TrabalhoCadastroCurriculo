const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Carregar variáveis de ambiente
require('dotenv').config();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conexão com o MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Definição do modelo do currículo
const CurriculoSchema = new mongoose.Schema({
  nome: String,
  email: String,
  telefone: String,
  endereco: String,
  formacao: [{ curso: String, instituicao: String, ano: String }],
  experiencia: [{ empresa: String, cargo: String, periodo: String }],
  habilidades: [String],
  idiomas: [String],
  objetivo: String
});

const Curriculo = mongoose.model('Curriculo', CurriculoSchema);

// Rotas CRUD
app.get('/', (req, res) => {
  res.send('API de Currículos funcionando!');
});

app.get('/curriculos', async (req, res) => {
  try {
    const curriculos = await Curriculo.find();
    res.status(200).json(curriculos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/curriculos', async (req, res) => {
  try {
    const novoCurriculo = new Curriculo(req.body);
    const resultado = await novoCurriculo.save();
    res.status(201).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
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

app.put('/curriculos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dadosAtualizados = req.body;

    const curriculoAtualizado = await Curriculo.findByIdAndUpdate(id, dadosAtualizados, {
      new: true,
      runValidators: true
    });

    if (!curriculoAtualizado) {
      return res.status(404).json({ message: 'Currículo não encontrado.' });
    }

    res.status(200).json(curriculoAtualizado);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o currículo.', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

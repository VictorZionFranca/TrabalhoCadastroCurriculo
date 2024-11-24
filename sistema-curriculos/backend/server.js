const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conexão com o MongoDB Atlas
mongoose.connect('mongodb+srv://vzion435:%40Franca2004@sistemacurriculos.2d7mt.mongodb.net/?retryWrites=true&w=majority&appName=SistemaCurriculos')
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Definição de modelo do currículo
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
app.post('/curriculos', async (req, res) => {
  try {
    const novoCurriculo = new Curriculo(req.body);
    await novoCurriculo.save();
    res.status(201).json(novoCurriculo);
  } catch (error) {
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

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

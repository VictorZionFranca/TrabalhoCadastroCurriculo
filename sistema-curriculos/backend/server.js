const mongoose = require('mongoose');
const { send } = require('@vercel/node');
const bodyParser = require('body-parser');

// Carregar variáveis de ambiente
require('dotenv').config();

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Definir modelo do currículo
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

// Função serverless que lida com todas as requisições para /api/curriculos
module.exports = async (req, res) => {
  // Parse body using body-parser (necessário para requisições POST, PUT, DELETE)
  bodyParser.json()(req, res, async () => {
    if (req.method === 'GET' && req.url === '/api/curriculos') {
      // Rota GET para listar os currículos
      try {
        const curriculos = await Curriculo.find();
        return send(res, 200, curriculos);
      } catch (error) {
        return send(res, 500, { error: error.message });
      }
    } else if (req.method === 'POST' && req.url === '/api/curriculos') {
      // Rota POST para criar um novo currículo
      try {
        const novoCurriculo = new Curriculo(req.body);
        const resultado = await novoCurriculo.save();
        return send(res, 201, resultado);
      } catch (error) {
        return send(res, 400, { error: error.message });
      }
    } else if (req.method === 'DELETE' && req.url.startsWith('/api/curriculos/')) {
      // Rota DELETE para excluir um currículo
      const { id } = req.url.split('/').pop();
      try {
        await Curriculo.findByIdAndDelete(id);
        return send(res, 200, { message: 'Currículo excluído com sucesso!' });
      } catch (error) {
        return send(res, 500, { error: 'Erro ao excluir currículo.' });
      }
    } else if (req.method === 'PUT' && req.url.startsWith('/api/curriculos/')) {
      // Rota PUT para atualizar um currículo
      const { id } = req.url.split('/').pop();
      const dadosAtualizados = req.body;
      try {
        const curriculoAtualizado = await Curriculo.findByIdAndUpdate(id, dadosAtualizados, {
          new: true,
          runValidators: true
        });

        if (!curriculoAtualizado) {
          return send(res, 404, { message: 'Currículo não encontrado.' });
        }

        return send(res, 200, curriculoAtualizado);
      } catch (error) {
        return send(res, 500, { message: 'Erro ao atualizar o currículo.', error: error.message });
      }
    } else {
      // Caso a rota não seja encontrada
      return send(res, 404, { message: 'Rota não encontrada' });
    }
  });
};

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDatabase from './database/db.js';
import mongoose from 'mongoose';

const app = express();

app.use(cors());
app.use(bodyParser.json());

const FormSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  nomePO: {
    type: String,
    required: true,
  },
  membros: {
    type: String,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  tecnologias: {
    type: Array,
    required: true,
  },
  outraTecCheck: {
    type: Boolean,
    required: false,
  },
  outraTec: {
    type: String,
    required: false,
  },
  contextoUso: {
    type: String,
    required: false,
  },
  acessoUsuario: {
    type: String,
    required: false,
  },
});

const formModel = mongoose.model('formModel', FormSchema)

app.post('/submit', async (req, res) => {
  try{
    const novoPedido = new formModel(req.body);
    await novoPedido.save();
    res.send('Dados enviados ao MongoDB!');
  }
  catch (error) {
    res.status(500).send(error.message);
  }
});

// app.post('/submit', (req, res) => {
//   const data = req.body;
//   const { error, value } = formSchema.validate(data);
//   if (error) {
//     return res.status(400).json({ error: error.details.map(detail => detail.message) })
//   }
//   console.log('Dados recebidos:', value);
//   res.status(200).json({ message: 'Dados recebidos com sucesso!',});
// });

const PORT = 3000;
connectDatabase()
  .then(() => {
    console.log('Conectado ao MongoDB!');
  });
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
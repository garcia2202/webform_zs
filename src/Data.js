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
  linguagens: {
    type: String,
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

// app.post('/submit', async (req, res) => {
//   try {
//     const novoPedido = new formModel(req.body);
//     await novoPedido.save();
//     res.send('Dados enviados ao CosmosDB!');
//   }
//   catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// const PORT = 5173;
// connectDatabase()
//   .then(() => {
//     console.log('Conectado ao CosmosDB!');
//   });
// app.listen(PORT, () => {
//   console.log(`Servidor rodando na porta ${PORT}`)
// })

const PORT = 3000;

async function startServer() {
  try {
    await connectDatabase();
    console.log('Conectado no CosmosDB!');
    
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });

    app.post('/', async (req, res) => {
      try {
        const novoPedido = new formModel(req.body);
        await novoPedido.save();
        res.send('Dados enviados ao CosmosDB!');
      } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
      }
    });
  } catch (error) {
    console.error('Erro ao conectar ao CosmosDB:', error);
  }
}

startServer();
connectDatabase()
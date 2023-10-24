import express from 'express';
import bodyParser from 'body-parser';
import formModel from '../models/FormSchema.js';
import connectDatabase from './database/db.js';
import cors from 'cors';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173',
}));

app.get('/', async (req, res) => {
  const dados = await formModel.find()

  return res.status(200).json(dados)
})


app.post('/', async (req, res) => {
  const data = req.body

  const newData = await formModel.create(data)

  return res.status(201).json(newData)
});

connectDatabase()
  .then(() => app.listen(5173, () => console.log('Servidor rodando e Banco de Dados conectado')))
  .catch((error) => console.log(error))
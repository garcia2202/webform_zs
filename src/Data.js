import express from 'express';
import bodyParser from 'body-parser';
import formModel from '../models/FormSchema.js';
import connectDatabase from './database/db.js';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', async (req, res) => {
  console.log('GET received')
  try{
    const dados = await formModel.find()
    return res.status(200).json(dados)
  }
  catch(error){
    return res.status(500).json({message: error.message})
  }
})


app.post('/', async (req, res) => {
  console.log('POST received')
  let newForm = req.body;
  console.log(newForm)
  try{
    const form = await formModel.create(newForm)
    return res.status(201).json(form)
  }
  catch(error){
    return res.status(500).json({message: error.message})
  }
});

connectDatabase()
  .then(() => app.listen(5173, () => console.log('Servidor rodando e Banco de Dados conectado')))
  .catch((error) => console.log(error))
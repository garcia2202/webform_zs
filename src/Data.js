import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/api/submit', (req, res) => {
  const data = req.body;
  console.log('Dados recebidos:', data);
  res.status(200).json({message: 'Dados recebidos com sucesso!'});
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
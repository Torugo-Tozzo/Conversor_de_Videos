const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Servidor rodando!');
});

app.post('/processar', (req, res) => {
  const { videoUrl } = req.body;
  console.log(`URL recebido: ${videoUrl}`);

  // Resto da lógica do processamento do URL...

  res.send('Processamento concluído!');
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});

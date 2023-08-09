const express = require('express');
const cors = require('cors');
const { exec } = require('youtube-dl-exec');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Servidor rodando!');
});

const corsOptions = {
  origin: 'http://localhost:3000', // Altere para o endereço do seu frontend React
};

app.post('/processar', cors(corsOptions), async (req, res) => {
  const { videoUrl } = req.body;

  try {
    // Buscar o título do vídeo
    const response = await axios.get(videoUrl);
    const $ = cheerio.load(response.data);
    const videoTitle = $('title').text().trim();

    res.json({ title: videoTitle });
  } catch (error) {
    console.error('Erro ao buscar o título do vídeo:', error);
    res.status(500).send('Erro ao buscar o título do vídeo');
  }
});

app.get('/download', cors(corsOptions), async (req, res) => {
  const { videoUrl, format } = req.query;

  try {
    // Buscar o título do vídeo
    const response = await axios.get(videoUrl);
    const $ = cheerio.load(response.data);
    const videoTitle = $('title').text().trim();
    const sanitizedTitle = videoTitle.replace(/[^\w\s-]/g, ''); // Remover caracteres inválidos do título
    const outputFilePath = path.join(__dirname, `${sanitizedTitle}.${format}`);

    // Baixar e converter o vídeo
    await exec(videoUrl, {
      output: outputFilePath,
      format: format === 'mp3' ? 'bestaudio' : 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
    });

    // Enviar o arquivo para o cliente como uma resposta de blob
    res.sendFile(outputFilePath, { headers: { 'Content-Type': 'application/octet-stream' } });

    // Excluir o arquivo após um intervalo de tempo (aqui definido como 5 segundos)
    setTimeout(() => {
      fs.unlink(outputFilePath, (err) => {
        if (err) {
          console.error('Erro ao excluir o arquivo:', err);
        } else {
          console.log('Arquivo excluído com sucesso');
        }
      });
    }, 5000);
  } catch (error) {
    console.error('Erro ao baixar e converter o vídeo:', error);
    res.status(500).send('Erro ao baixar e converter o vídeo');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});

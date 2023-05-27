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
  const { videoUrl } = req.query;

  try {
    // Buscar o título do vídeo
    const response = await axios.get(videoUrl);
    const $ = cheerio.load(response.data);
    const videoTitle = $('title').text().trim();
    const sanitizedTitle = videoTitle.replace(/[^\w\s-]/g, ''); // Remover caracteres inválidos do título
    const outputFilePath = path.join(__dirname, `${sanitizedTitle}.mp3`);

    // Baixar e converter o vídeo em MP3
    await exec(videoUrl, {
      extractAudio: true,
      audioFormat: 'mp3',
      output: outputFilePath,
    });

    // Transmitir o arquivo de áudio para o navegador e iniciar o download
    res.setHeader('Content-Disposition', `attachment; filename=${sanitizedTitle}.mp3`);
    res.setHeader('Content-Type', 'audio/mpeg');
    const stream = fs.createReadStream(outputFilePath);
    stream.pipe(res);

    // Aguardar 10 segundos antes de excluir o arquivo MP3
    setTimeout(() => {
      fs.unlink(outputFilePath, (err) => {
        if (err) {
          console.error('Erro ao excluir o arquivo de áudio:', err);
        } else {
          console.log('Arquivo de áudio excluído com sucesso');
        }
      });
    }, 10000);
  } catch (error) {
    console.error('Erro ao baixar e converter o vídeo:', error);
    res.status(500).send('Erro ao baixar e converter o vídeo');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
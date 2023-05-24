const express = require('express');
const cors = require('cors');
const { exec } = require('youtube-dl-exec');
const fs = require('fs');
const path = require('path');

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
    // Baixar e converter o vídeo em MP3
    const outputFilePath = path.join(__dirname, 'audio.mp3');
    await exec(videoUrl, {
      extractAudio: true,
      audioFormat: 'mp3',
      output: outputFilePath,
    });

    // Verificar se o arquivo de áudio foi criado
    const fileExists = fs.existsSync(outputFilePath);
    if (!fileExists) {
      throw new Error('Erro ao criar o arquivo de áudio');
    }

    // Transmitir o arquivo de áudio para o navegador e iniciar o download
    res.setHeader('Content-Disposition', 'attachment; filename=audio.mp3');
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

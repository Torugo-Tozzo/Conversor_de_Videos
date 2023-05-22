import React, { useState } from 'react';

function App() {
  const [videoUrl, setVideoUrl] = useState('');

  const handleInputChange = (event) => {
    setVideoUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica para enviar a URL do vídeo para o backend
    console.log(videoUrl);
    // Limpar o campo de entrada após o envio
    setVideoUrl('');
  };

  return (
    <div>
      <h1>Conversão de Vídeo do YouTube</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="videoUrl">URL do Vídeo:</label>
        <input
          type="text"
          id="videoUrl"
          name="videoUrl"
          value={videoUrl}
          onChange={handleInputChange}
          required
        />
        <br />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;

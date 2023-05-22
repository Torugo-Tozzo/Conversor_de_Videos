import React, { useState } from 'react';
import axios from 'axios';

function VideoForm() {
  const [videoUrl, setVideoUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/processar', { videoUrl });
      console.log(response.data); // Exibe a resposta do servidor no console
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setVideoUrl(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="input-group">
          <input
            type="text"
            id="videoUrl"
            name="videoUrl"
            value={videoUrl}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Insira a URL do vídeo"
            required
          />
          <button type="submit" className="btn btn-primary">Enviar</button>
        </div>
      </form>
    </div>
  );
}

export default VideoForm;

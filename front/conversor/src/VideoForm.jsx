import React, { useState } from 'react';
import axios from 'axios';
import logo from './Images/Conversor.png';
import './styles.css';

function VideoForm() {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/processar', { videoUrl });
      setVideoTitle(response.data.title);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    setIsDownloading(true);
    window.open(`http://localhost:5000/download?videoUrl=${encodeURIComponent(videoUrl)}`, '_blank');
    setIsDownloading(false);
  };

  const handleInputChange = (e) => {
    setVideoUrl(e.target.value);
  };

  return (
    <div className="video-form-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <form onSubmit={handleSubmit} className="mb-3">
        <div className="input-bar">
          <input
            type="text"
            id="videoUrl"
            name="videoUrl"
            value={videoUrl}
            onChange={handleInputChange}
            className="form-control input-bar"
            placeholder="Insira a URL do vídeo"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Buscar Título</button>
      </form>

      {isLoading && <p>Carregando...</p>}

      {videoTitle && !isLoading && (
        <div className="button-container">
          <h3>Título do Vídeo: {videoTitle}</h3>
          <button onClick={handleDownload} disabled={isDownloading} className="btn btn-primary">
            {isDownloading ? 'Fazendo download...' : 'Baixar'}
          </button>
        </div>
      )}
    </div>
  );
}

export default VideoForm;

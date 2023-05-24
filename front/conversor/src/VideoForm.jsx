import React, { useState } from 'react';
import axios from 'axios';

function VideoForm() {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/processar', { videoUrl });
      setVideoTitle(response.data.title);
    } catch (error) {
      console.error(error);
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
          <button type="submit" className="btn btn-primary">Buscar Título</button>
        </div>
      </form>

      {videoTitle && (
        <div>
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

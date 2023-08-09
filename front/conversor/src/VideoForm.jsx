import React, { useState } from 'react';
import axios from 'axios';
import VideoInput from './VideoInput';
import VideoTitle from './VideoTitle';
import FormatOptions from './FormatOptions';
import DownloadButton from './DownloadButton';
import logo from './Images/Conversor.png';
import './styles.css';

function VideoForm() {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('https://conversor-de-videos-96cn.vercel.app/processar', { videoUrl });
      setVideoTitle(response.data.title);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (selectedFormat) {
      setIsDownloading(true);

      try {
        const response = await axios.get('https://conversor-de-videos-96cn.vercel.app/download', {
          params: { videoUrl, format: selectedFormat },
          responseType: 'blob', // Especificar o tipo de resposta como blob (objeto binário)
        });

        const downloadUrl = URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `${videoTitle}.${selectedFormat}`;
        link.click();

        setIsDownloading(false);
      } catch (error) {
        console.error('Erro ao baixar o vídeo:', error);
        setIsDownloading(false);
      }
    } else {
      alert('Selecione um formato de download');
    }
  };

  const handleInputChange = (e) => {
    setVideoUrl(e.target.value);
  };

  const handleFormatChange = (e) => {
    setSelectedFormat(e.target.value);
  };

  return (
    <div className="video-form-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <form onSubmit={handleSubmit} className="mb-3">
        <VideoInput
          videoUrl={videoUrl}
          handleInputChange={handleInputChange}
        />
        <button type="submit" className="btn btn-primary">
          Buscar Título
        </button>
      </form>

      {isLoading && <p>Carregando...</p>}

      {videoTitle && !isLoading && (
        <div className="button-container">
          <VideoTitle videoTitle={videoTitle} />
          <FormatOptions
            selectedFormat={selectedFormat}
            handleFormatChange={handleFormatChange}
          />
          <DownloadButton
            handleDownload={handleDownload}
            isDownloading={isDownloading}
          />
        </div>
      )}
    </div>
  );
}

export default VideoForm;

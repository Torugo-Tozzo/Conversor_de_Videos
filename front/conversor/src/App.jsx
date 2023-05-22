import React from 'react';
import VideoForm from './VideoForm';
import Header from './Header';
import Footer from './Footer';

function App() {
  const handleSubmit = (videoUrl) => {
    // Aqui você pode adicionar a lógica para enviar a URL do vídeo para o backend
    console.log(videoUrl);
  };

  return (
    <div>
        <Header />
        <main>
        <VideoForm onSubmit={handleSubmit} />
        </main>
        <Footer />
    </div>
  );
}

export default App;

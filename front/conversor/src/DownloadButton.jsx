import React, { useState } from 'react';

function DownloadButton({ handleDownload, isDownloading }) {
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleDownloadClick = async () => {
    if (!isDownloading) {
      setDownloadProgress(0); // Reinicia o progresso do download
      await handleDownload();
    }
  };

  return (
    <div>
      <button onClick={handleDownloadClick} disabled={isDownloading} className="btn btn-primary">
        {isDownloading ? 'Fazendo download...' : 'Baixar'}
      </button>
      {isDownloading && (
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${downloadProgress}%` }}
            aria-valuenow={downloadProgress}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
      )}
    </div>
  );
}

export default DownloadButton;

import React from 'react';

function VideoInput({ videoUrl, handleInputChange }) {
  return (
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
  );
}

export default VideoInput;

import React from 'react';
import { FiMusic, FiFilm } from 'react-icons/fi';
import './styles.css'; // Importe o arquivo CSS para estilização

function FormatOptions({ selectedFormat, handleFormatChange }) {
  return (
    <div className="format-options">
      <label className='space'>
        <div className="icon-container">
          <FiMusic className="icon" size={48} />
          <span className="format-text">MP3</span>
        </div>
        
        <input
          type="radio"
          value="mp3"
          checked={selectedFormat === 'mp3'}
          onChange={handleFormatChange}
          className="checkbox"
        />
      </label>
      <label className='space'>
        <div className="icon-container">
          <FiFilm className="icon" size={48} />
          <span className="format-text">MP4</span>
        </div>
        <input
          type="radio"
          value="mp4"
          checked={selectedFormat === 'mp4'}
          onChange={handleFormatChange}
          className="checkbox"
        />
      </label>
    </div>
  );
}

export default FormatOptions;

import React from 'react';

function FormatOptions({ selectedFormat, handleFormatChange }) {
  return (
    <div className="format-options">
      <label>
        <input
          type="radio"
          value="mp3"
          checked={selectedFormat === 'mp3'}
          onChange={handleFormatChange}
        />
        MP3
      </label>
      <label>
        <input
          type="radio"
          value="mp4"
          checked={selectedFormat === 'mp4'}
          onChange={handleFormatChange}
        />
        MP4
      </label>
    </div>
  );
}

export default FormatOptions;

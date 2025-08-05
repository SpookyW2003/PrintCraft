// src/components/UploadArt.jsx
import React, { useState, useRef } from 'react';

const UploadArt = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleUploadButtonClick = () => {
    if (selectedFile) {
      alert(`Uploading ${selectedFile.name}... (This is a placeholder, actual upload logic needed)`);
      // In a real application, you would send `selectedFile` to your backend here.
      // Example: formData.append('file', selectedFile); axios.post('/upload', formData);
      // You might want to clear the selection or show a success message
      // setSelectedFile(null);
      // setPreviewUrl(null);
    } else {
      alert('Please select a file to upload.');
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // Clear the file input
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 my-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Upload Your Custom Art</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Unleash your creativity! Upload your unique designs and logos to get started with custom printing.
      </p>

      <div
        className="border-2 border-dashed border-purple-300 rounded-lg p-8 mb-8 text-center bg-purple-50 hover:bg-purple-100 transition-colors duration-200"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept="image/*" // Restrict to image files
        />
        <div className="flex flex-col items-center justify-center space-y-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-purple-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="text-xl font-semibold text-gray-700">Drag and drop your file here, or</p>
          <button
            onClick={() => fileInputRef.current.click()}
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-full shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-all duration-200"
          >
            Browse Files
          </button>
          <p className="text-sm text-gray-500 mt-2">
            Supported formats: JPG, PNG, SVG, PDF. Max file size: 10MB.
          </p>
        </div>
      </div>

      {previewUrl && (
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">File Preview:</h2>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-48 h-48 flex-shrink-0 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
              <img src={previewUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
            </div>
            <div className="flex-grow text-center md:text-left">
              <p className="text-lg font-medium text-gray-700 mb-2">
                <span className="font-semibold">File Name:</span> {selectedFile?.name}
              </p>
              <p className="text-md text-gray-600 mb-4">
                <span className="font-semibold">File Size:</span> {(selectedFile?.size / (1024 * 1024)).toFixed(2)} MB
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <button
                  onClick={handleUploadButtonClick}
                  className="px-6 py-3 bg-green-500 text-white font-semibold rounded-full shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-all duration-200"
                >
                  Confirm & Upload
                </button>
                <button
                  onClick={clearSelection}
                  className="px-6 py-3 bg-red-500 text-white font-semibold rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-all duration-200"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!selectedFile && (
        <p className="text-center text-gray-500 text-lg mt-10">
          Once you upload your art, a preview and upload options will appear here.
        </p>
      )}
    </div>
  );
};

export default UploadArt;
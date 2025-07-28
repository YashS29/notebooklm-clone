// import React, { useRef } from 'react';

// const UploadArea = ({ onFileSelect }) => {
//   const fileInputRef = useRef(null);

//   const handleFileSelect = (event) => {
//     const file = event.target.files[0];
//     if (file && file.type === 'application/pdf') {
//       onFileSelect(file);
//     }
//   };

//   return (
//     <div className="upload-area">
//       <div 
//         className="upload-box"
//         onClick={() => fileInputRef.current?.click()}
//       >
//         <div className="upload-icon">📄</div>
//         <div className="upload-text">Upload PDF to start chatting</div>
//         <div className="upload-subtext">Click or drag and drop your file here</div>
//       </div>
//       <input
//         ref={fileInputRef}
//         type="file"
//         accept=".pdf"
//         onChange={handleFileSelect}
//         style={{ display: 'none' }}
//       />
//     </div>
//   );
// };

// export default UploadArea;
import React, { useState, useRef, useCallback } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import './UploadArea.css';

const UploadArea = ({ onFileSelect, isUploading = false, uploadProgress = 0 }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success, error
  const [fileName, setFileName] = useState('');
  const [currentProgress, setCurrentProgress] = useState(0);
  const [progressInterval, setProgressInterval] = useState(null); // Track interval
  const fileInputRef = useRef(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const validateFile = (file) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['application/pdf'];
    
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Please upload a PDF file only');
    }
    
    if (file.size > maxSize) {
      throw new Error('File size must be less than 10MB');
    }
    
    return true;
  };

  const handleFiles = useCallback(async (files) => {
    const file = files[0];
    if (!file) return;

    try {
      validateFile(file);
      setFileName(file.name);
      setUploadStatus('uploading');
      setCurrentProgress(0);
      
      // Clear any existing interval
      if (progressInterval) {
        clearInterval(progressInterval);
      }
      
      // Real 1-100% progress - runs only once
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 8) + 2; // Random increment between 2-10
        
        if (progress >= 100) {
          progress = 100;
          setCurrentProgress(100);
          clearInterval(interval);
          setProgressInterval(null);
          
          // Show 100% for a moment, then complete
          setTimeout(() => {
            setUploadStatus('success');
            onFileSelect(file); // Call your original function
            setTimeout(() => {
              setUploadStatus('idle');
              setFileName('');
              setCurrentProgress(0);
            }, 2000);
          }, 300);
        } else {
          setCurrentProgress(progress);
        }
      }, 150);
      
      setProgressInterval(interval);
      
    } catch (error) {
      setUploadStatus('error');
      setCurrentProgress(0);
      if (progressInterval) {
        clearInterval(progressInterval);
        setProgressInterval(null);
      }
      console.error('Upload error:', error.message);
      setTimeout(() => {
        setUploadStatus('idle');
        setFileName('');
      }, 3000);
    }
  }, [onFileSelect, progressInterval]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleChange = useCallback((e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  }, [handleFiles]);

  const onButtonClick = () => {
    if (uploadStatus === 'idle') {
      fileInputRef.current?.click();
    }
  };

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case 'uploading':
        return <div className="upload-spinner" />;
      case 'success':
        return <CheckCircle className="status-icon success" size={24} />;
      case 'error':
        return <AlertCircle className="status-icon error" size={24} />;
      default:
        return <Upload className="upload-icon" size={32} />;
    }
  };

  const getStatusText = () => {
    switch (uploadStatus) {
      case 'uploading':
        return 'Uploading PDF...';
      case 'success':
        return 'PDF uploaded successfully!';
      case 'error':
        return 'Upload failed. Please try again.';
      default:
        return 'Upload PDF to start chatting';
    }
  };

  const getSubText = () => {
    if (uploadStatus === 'idle') {
      return 'Click or drag and drop your file here';
    }
    if (fileName && uploadStatus !== 'idle') {
      return fileName;
    }
    return '';
  };

  return (
    <div className="upload-area">
      <div
        className={`upload-box ${dragActive ? 'drag-active' : ''} ${uploadStatus}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleChange}
          style={{ display: 'none' }}
        />
        
        <div className="upload-content">
          <div className="icon-container">
            {getStatusIcon()}
          </div>
          
          <div className="upload-text">{getStatusText()}</div>
          <div className="upload-subtext">{getSubText()}</div>
        </div>
        
        {uploadStatus === 'uploading' && (
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${currentProgress}%` }}
              />
            </div>
            <span className="progress-text">{currentProgress}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadArea;
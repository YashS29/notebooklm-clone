import { useState, useCallback } from 'react';

export const usePDF = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [pdfFile, setPdfFile] = useState(null);
  const [error, setError] = useState(null);

  const uploadPDF = useCallback(async (file) => {
    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Wait a bit to show 100% completion
      setTimeout(() => {
        setPdfFile(file);
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);

      return file;
    } catch (err) {
      setError(err.message || 'Upload failed');
      setIsUploading(false);
      setUploadProgress(0);
      throw err;
    }
  }, []);

  const resetPDF = useCallback(() => {
    setPdfFile(null);
    setError(null);
    setUploadProgress(0);
  }, []);

  return {
    uploadPDF,
    resetPDF,
    isUploading,
    uploadProgress,
    pdfFile,
    error,
  };
};
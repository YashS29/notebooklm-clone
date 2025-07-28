// import React, { useRef, useEffect, useState } from 'react';
// import * as pdfjsLib from 'pdfjs-dist';

// const PDFViewer = ({ file, currentPage, onPageChange, onDocumentLoad, documentInfo }) => {
//   const canvasRef = useRef(null);
//   const [pdfDoc, setPdfDoc] = useState(null);
//   const [totalPages, setTotalPages] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [renderTask, setRenderTask] = useState(null);

//   useEffect(() => {
//     if (file) {
//       loadPDF();
//     }
//   }, [file]);

//   useEffect(() => {
//     if (pdfDoc && currentPage) {
//       renderPage(currentPage);
//     }
//   }, [pdfDoc, currentPage]);

//   const loadPDF = async () => {
//     setIsLoading(true);
//     try {
//       // Clean up any existing PDF document
//       if (pdfDoc) {
//         pdfDoc.cleanup();
//         pdfDoc.destroy();
//       }

//       // Try to load from backend URL first (if available)
//       if (documentInfo && documentInfo.fileName) {
//         try {
//           console.log('Trying to load PDF from URL:', documentInfo.fileName);
//           const pdfUrl = `http://localhost:5000/api/pdf/file/${documentInfo.fileName}`;
//           const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
//           setPdfDoc(pdf);
//           setTotalPages(pdf.numPages);
//           onDocumentLoad(pdf);
//           setIsLoading(false);
//           console.log('PDF loaded successfully from URL');
//           return;
//         } catch (urlError) {
//           console.log('Backend URL failed, trying file buffer:', urlError);
//         }
//       }
      
//       // Fallback to original file buffer method
//       console.log('Loading PDF from file buffer');
//       const arrayBuffer = await file.arrayBuffer();
//       const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
//       setPdfDoc(pdf);
//       setTotalPages(pdf.numPages);
//       onDocumentLoad(pdf);
//       setIsLoading(false);
//       console.log('PDF loaded successfully from buffer');
//     } catch (error) {
//       console.error('Error loading PDF:', error);
//       setIsLoading(false);
//     }
//   };

//   const renderPage = async (pageNum) => {
//     if (!pdfDoc || !canvasRef.current) return;
    
//     try {
//       // Cancel any ongoing render task
//       if (renderTask) {
//         renderTask.cancel();
//       }

//       const page = await pdfDoc.getPage(pageNum);
//       const canvas = canvasRef.current;
//       const context = canvas.getContext('2d');
      
//       // Get container width for responsive scaling
//       const container = canvas.parentElement;
//       const containerWidth = container.clientWidth - 40; // Account for padding
      
//       // Calculate scale to fit container
//       const viewport = page.getViewport({ scale: 1 });
//       const scale = Math.min(containerWidth / viewport.width, 1.5); // Max scale of 1.5
      
//       const scaledViewport = page.getViewport({ scale });
//       canvas.height = scaledViewport.height;
//       canvas.width = scaledViewport.width;
      
//       // ✅ Clear canvas before rendering to prevent canvas reuse error
//       context.clearRect(0, 0, canvas.width, canvas.height);
      
//       // ✅ Create new render task with proper cleanup
//       const newRenderTask = page.render({
//         canvasContext: context,
//         viewport: scaledViewport
//       });
      
//       setRenderTask(newRenderTask);
      
//       await newRenderTask.promise;
//       setRenderTask(null);
      
//     } catch (error) {
//       if (error.name === 'RenderingCancelledException') {
//         console.log('Rendering was cancelled');
//       } else {
//         console.error('Error rendering page:', error);
//       }
//       setRenderTask(null);
//     }
//   };

//   // Handle window resize
//   useEffect(() => {
//     const handleResize = () => {
//       if (pdfDoc && currentPage) {
//         setTimeout(() => renderPage(currentPage), 100);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, [pdfDoc, currentPage]);

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       if (renderTask) {
//         renderTask.cancel();
//       }
//       if (pdfDoc) {
//         pdfDoc.cleanup();
//         pdfDoc.destroy();
//       }
//     };
//   }, []);

//   return (
//     <div className="pdf-viewer">
//       <div className="pdf-toolbar">
//         <div className="pdf-title">📄 {file?.name || 'Document'}</div>
//         <div className="pdf-controls">
//           <button 
//             onClick={() => onPageChange(Math.max(1, currentPage - 1))}
//             disabled={currentPage <= 1 || isLoading}
//           >
//             ←
//           </button>
//           <span>{currentPage} / {totalPages}</span>
//           <button 
//             onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
//             disabled={currentPage >= totalPages || isLoading}
//           >
//             →
//           </button>
//         </div>
//       </div>
//       <div className="pdf-canvas-container">
//         {isLoading ? (
//           <div className="pdf-loading">Loading PDF...</div>
//         ) : (
//           <canvas ref={canvasRef} className="pdf-canvas"></canvas>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PDFViewer;

import React, { useRef, useEffect, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

const PDFViewer = ({ file, currentPage, onPageChange, onDocumentLoad, documentInfo }) => {
  const canvasRef = useRef(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const renderTaskRef = useRef(null); // Track current render task

  useEffect(() => {
    if (file) {
      loadPDF();
    }
  }, [file]);

  useEffect(() => {
    if (pdfDoc && currentPage) {
      renderPage(currentPage);
    }
  }, [pdfDoc, currentPage]);

  const loadPDF = async () => {
    setIsLoading(true);
    try {
      // Try to load from backend URL first (if available)
      if (documentInfo && documentInfo.fileName) {
        try {
          console.log('Trying to load PDF from URL:', documentInfo.fileName);
          const pdfUrl = `http://localhost:5000/api/pdf/file/${documentInfo.fileName}`;
          const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
          setPdfDoc(pdf);
          setTotalPages(pdf.numPages);
          onDocumentLoad(pdf);
          setIsLoading(false);
          console.log('PDF loaded successfully from URL');
          return;
        } catch (urlError) {
          console.log('Backend URL failed, trying file buffer:', urlError);
        }
      }
      
      // Fallback to original file buffer method
      console.log('Loading PDF from file buffer');
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      setPdfDoc(pdf);
      setTotalPages(pdf.numPages);
      onDocumentLoad(pdf);
      setIsLoading(false);
      console.log('PDF loaded successfully from buffer');
    } catch (error) {
      console.error('Error loading PDF:', error);
      setIsLoading(false);
    }
  };

  const renderPage = async (pageNum) => {
    if (!pdfDoc || !canvasRef.current) return;
    
    try {
      // Cancel any ongoing render task
      if (renderTaskRef.current) {
        console.log('Cancelling previous render task');
        renderTaskRef.current.cancel();
        renderTaskRef.current = null;
      }

      const page = await pdfDoc.getPage(pageNum);
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      // Get container width for responsive scaling
      const container = canvas.parentElement;
      const containerWidth = container.clientWidth - 40; // Account for padding
      
      // Calculate scale to fit container
      const viewport = page.getViewport({ scale: 1 });
      const scale = Math.min(containerWidth / viewport.width, 1.5); // Max scale of 1.5
      
      const scaledViewport = page.getViewport({ scale });
      canvas.height = scaledViewport.height;
      canvas.width = scaledViewport.width;
      
      // Clear canvas before rendering
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create render task and store reference
      const renderTask = page.render({
        canvasContext: context,
        viewport: scaledViewport
      });
      
      renderTaskRef.current = renderTask;
      
      await renderTask.promise;
      renderTaskRef.current = null; // Clear reference when done
      
    } catch (error) {
      if (error.name === 'RenderingCancelledException') {
        console.log('Rendering was cancelled');
      } else {
        console.error('Error rendering page:', error);
      }
      renderTaskRef.current = null;
    }
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (pdfDoc && currentPage) {
        setTimeout(() => renderPage(currentPage), 100);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [pdfDoc, currentPage]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
    };
  }, []);

  return (
    <div className="pdf-viewer">
      <div className="pdf-toolbar">
        <div className="pdf-title">📄 {file?.name || 'Document'}</div>
        <div className="pdf-controls">
          <button 
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1 || isLoading}
          >
            ←
          </button>
          <span>{currentPage} / {totalPages}</span>
          <button 
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage >= totalPages || isLoading}
          >
            →
          </button>
        </div>
      </div>
      <div className="pdf-canvas-container">
        {isLoading ? (
          <div className="pdf-loading">Loading PDF...</div>
        ) : (
          <canvas ref={canvasRef} className="pdf-canvas"></canvas>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;

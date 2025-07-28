// import React, { useState } from 'react';
// import UploadArea from './components/UploadArea';
// import PDFViewer from './components/PDFViewer';
// import ChatInterface from './components/ChatInterface';
// import { uploadPDF } from './services/api';
// import './styles/globals.css';

// function App() {
//   const [pdfFile, setPdfFile] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pdfDoc, setPdfDoc] = useState(null);
  
//   // New state for document info (but no preview UI)
//   const [documentInfo, setDocumentInfo] = useState(null);

//   // Enhanced file select handler
//   const handleFileSelect = async (file) => {
//     try {
//       // Upload PDF and get document info
//       const response = await uploadPDF(file);
      
//       // Set the file and document info (skip preview)
//       setPdfFile(file);
//       setDocumentInfo(response.documentInfo);
      
//     } catch (error) {
//       console.error('Error uploading PDF:', error);
//       // Fallback to original behavior if API fails
//       setPdfFile(file);
//     }
//   };

//   return (
//     <div className="app-container">
//       <div className="sidebar">
//         {!pdfFile ? (
//           <UploadArea onFileSelect={handleFileSelect} />
//         ) : (
//           <PDFViewer 
//             file={pdfFile}
//             currentPage={currentPage}
//             onPageChange={setCurrentPage}
//             onDocumentLoad={setPdfDoc}
//           />
//         )}
//       </div>
//       <div className="main-content">
//         <ChatInterface 
//           pdfFile={pdfFile}
//           currentPage={currentPage}
//           onPageChange={setCurrentPage}
//           documentInfo={documentInfo}
//         />
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import UploadArea from './components/UploadArea';
import PDFViewer from './components/PDFViewer';
import ChatInterface from './components/ChatInterface';
import { uploadPDF } from './services/api';
import './styles/globals.css';

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pdfDoc, setPdfDoc] = useState(null);
     
  // New state for document info (but no preview UI)
  const [documentInfo, setDocumentInfo] = useState(null);
     
  // ADD THIS: State to control whether to show preview or split view
  const [showSplitView, setShowSplitView] = useState(false);

  // Enhanced file select handler with better error handling
  const handleFileSelect = async (file) => {
    try {
      console.log('Starting file upload...', file.name);
      
      // Upload PDF and get document info
      const response = await uploadPDF(file);
      
      console.log('Upload response:', response);
      
      // Check if the response is successful
      if (response.error) {
        throw new Error(response.error);
      }
      
      // Set the file and document info (skip preview)
      setPdfFile(file);
      setDocumentInfo(response.documentInfo);
      
      // Automatically show split view after upload
      setShowSplitView(true);
      
      console.log('File uploaded successfully!');
           
    } catch (error) {
      console.error('Error uploading PDF:', error);
      alert(`Upload failed: ${error.message}`);
      
      // Don't set the file if upload failed - user should fix the issue
      // Remove the fallback behavior that was causing issues
    }
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        {!pdfFile ? (
          <UploadArea onFileSelect={handleFileSelect} />
        ) : showSplitView ? (
          // Show AI questions/chat on left side
          <ChatInterface 
            pdfFile={pdfFile}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            documentInfo={documentInfo}
          />
        ) : (
          // This will never show now, but keeping for safety
          <PDFViewer 
            file={pdfFile}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onDocumentLoad={setPdfDoc}
            documentInfo={documentInfo}
          />
        )}
      </div>
      <div className="main-content">
        {pdfFile && showSplitView ? (
          // Show PDF viewer on right side - PASS documentInfo here
          <PDFViewer 
            file={pdfFile}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onDocumentLoad={setPdfDoc}
            documentInfo={documentInfo}
          />
        ) : (
          // Show chat interface when no PDF (original behavior)
          <ChatInterface 
            pdfFile={pdfFile}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            documentInfo={documentInfo}
          />
        )}
      </div>
    </div>
  );
}

export default App;
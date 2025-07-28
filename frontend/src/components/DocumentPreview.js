import React, { useRef, useEffect, useState } from 'react';
import { FileText, CheckCircle } from 'lucide-react';
import { getDocument } from 'pdfjs-dist';
import './DocumentPreview.css';

const DocumentPreview = ({ documentInfo, file, onContinue }) => {
  const canvasRef = useRef(null);
  const [pdfDoc, setPdfDoc] = useState(null);

  useEffect(() => {
    if (file) {
      loadPDF();
    }
  }, [file]);

  const loadPDF = async () => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await getDocument(arrayBuffer).promise;
      setPdfDoc(pdf);
      renderPage(1); // Render first page
    } catch (error) {
      console.error('Error loading PDF:', error);
    }
  };

  const renderPage = async (pageNum) => {
    if (!pdfDoc || !canvasRef.current) return;
    
    try {
      const page = await pdfDoc.getPage(pageNum);
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      const viewport = page.getViewport({ scale: 0.8 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      
      await page.render({
        canvasContext: context,
        viewport: viewport
      }).promise;
    } catch (error) {
      console.error('Error rendering page:', error);
    }
  };

  if (!documentInfo) return null;

  const { title, pages, summary, readyMessage, suggestions } = documentInfo;

  return (
    <div className="document-preview-container">
      {/* Left side - PDF Preview */}
      <div className="pdf-preview-section">
        <div className="pdf-preview-header">
          <div className="document-icon">
            <FileText size={20} />
          </div>
          <div className="document-status">
            <CheckCircle className="check-icon" size={16} />
            <span className="ready-message">{readyMessage}</span>
          </div>
        </div>
        
        <div className="pdf-canvas-container">
          <canvas ref={canvasRef} className="pdf-preview-canvas"></canvas>
        </div>
      </div>

      {/* Right side - Document Info */}
      <div className="document-info-section">
        <div className="document-title">
          <h3>{title}</h3>
          <span className="page-count">{pages} pages</span>
        </div>

        <div className="document-content">
          <p className="content-description">
            You can now ask questions about your document. For example:
          </p>

          <div className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="suggestion-item">
                <span className="suggestion-bullet">•</span>
                <span className="suggestion-text">"{suggestion}"</span>
              </div>
            ))}
          </div>

          {summary && (
            <div className="document-summary">
              <h4>Summary of Skills and Qualifications</h4>
              
              {summary.technicalSkills && summary.technicalSkills.length > 0 && (
                <div className="skill-section">
                  <strong>Technical Skills:</strong>
                  <div className="skill-tags">
                    {summary.technicalSkills.map((skill, index) => (
                      <span key={index} className="skill-tag technical">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {summary.softSkills && summary.softSkills.length > 0 && (
                <div className="skill-section">
                  <strong>Soft Skills:</strong>
                  <div className="skill-tags">
                    {summary.softSkills.map((skill, index) => (
                      <span key={index} className="skill-tag soft">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {summary.education && summary.education.length > 0 && (
                <div className="skill-section">
                  <strong>Education:</strong>
                  <div className="skill-tags">
                    {summary.education.map((item, index) => (
                      <span key={index} className="skill-tag education">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="summary-text">
                <p>{summary.summary}</p>
              </div>
            </div>
          )}
        </div>

        <div className="preview-actions">
          <button className="continue-btn" onClick={onContinue}>
            Continue to Document View
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;
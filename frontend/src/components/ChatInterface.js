// import React, { useState } from 'react';
// import { FileText, CheckCircle, X } from 'lucide-react';
// import './ChatInterface.css';

// const ChatInterface = ({ pdfFile, currentPage, onPageChange, documentInfo }) => {
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [showPreview, setShowPreview] = useState(true);

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!inputMessage.trim()) return;

//     // Add user message
//     const userMessage = { type: 'user', content: inputMessage };
//     setMessages(prev => [...prev, userMessage]);
    
//     // Clear input
//     setInputMessage('');
    
//     // Simulate AI response (replace with your actual API call)
//     setTimeout(() => {
//       const aiResponse = { 
//         type: 'ai', 
//         content: `This is a response about: ${inputMessage}`,
//         citations: [{ page: currentPage, text: `Page ${currentPage}` }]
//       };
//       setMessages(prev => [...prev, aiResponse]);
//     }, 1000);
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setInputMessage(suggestion);
//     setShowPreview(false);
//   };

//   const handleClosePreview = () => {
//     setShowPreview(false);
//   };

//   // Show document preview if available and showPreview is true
//   if (pdfFile && documentInfo && showPreview) {
//     const { title, pages, summary, readyMessage, suggestions } = documentInfo;
    
//     return (
//       <div className="chat-interface">
//         <div className="document-preview-chat">
//           <div className="preview-header">
//             <div className="document-status">
//               <FileText size={20} className="document-icon" />
//               <CheckCircle className="check-icon" size={16} />
//               <span className="ready-message">{readyMessage}</span>
//             </div>
//             <button className="close-preview" onClick={handleClosePreview}>
//               <X size={16} />
//             </button>
//           </div>

//           <div className="document-title">
//             <h3>{title}</h3>
//             <span className="page-count">{pages} pages</span>
//           </div>

//           <div className="document-content">
//             <p className="content-description">
//               You can now ask questions about your document. For example:
//             </p>

//             <div className="suggestions-list">
//               {suggestions.map((suggestion, index) => (
//                 <div 
//                   key={index} 
//                   className="suggestion-item clickable"
//                   onClick={() => handleSuggestionClick(suggestion)}
//                 >
//                   <span className="suggestion-bullet">•</span>
//                   <span className="suggestion-text">"{suggestion}"</span>
//                 </div>
//               ))}
//             </div>

//             {summary && (
//               <div className="document-summary">
//                 <h4>Summary of Skills and Qualifications</h4>
                
//                 {summary.technicalSkills && summary.technicalSkills.length > 0 && (
//                   <div className="skill-section">
//                     <strong>Technical Skills:</strong>
//                     <div className="skill-tags">
//                       {summary.technicalSkills.map((skill, index) => (
//                         <span key={index} className="skill-tag technical">
//                           {skill}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {summary.softSkills && summary.softSkills.length > 0 && (
//                   <div className="skill-section">
//                     <strong>Soft Skills:</strong>
//                     <div className="skill-tags">
//                       {summary.softSkills.map((skill, index) => (
//                         <span key={index} className="skill-tag soft">
//                           {skill}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {summary.education && summary.education.length > 0 && (
//                   <div className="skill-section">
//                     <strong>Education:</strong>
//                     <div className="skill-tags">
//                       {summary.education.map((item, index) => (
//                         <span key={index} className="skill-tag education">
//                           {item}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 <div className="summary-text">
//                   <p>{summary.summary}</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Regular chat interface
//   return (
//     <div className="chat-interface">
//       <div className="chat-header">
//         <h2>Chat with your document</h2>
//       </div>
      
//       <div className="chat-messages">
//         {messages.length === 0 && !pdfFile && (
//           <div className="empty-state">
//             <p>Upload a PDF to start chatting</p>
//           </div>
//         )}
        
//         {messages.length === 0 && pdfFile && (
//           <div className="empty-state">
//             <p>Ask me anything about your document!</p>
//           </div>
//         )}
        
//         {messages.map((message, index) => (
//           <div key={index} className={`message ${message.type}`}>
//             <div className="message-content">
//               {message.content}
//               {message.citations && (
//                 <div className="citations">
//                   {message.citations.map((citation, i) => (
//                     <button 
//                       key={i} 
//                       className="citation-btn"
//                       onClick={() => onPageChange(citation.page)}
//                     >
//                       {citation.text}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
      
//       <form className="chat-input-form" onSubmit={handleSendMessage}>
//         <input
//           type="text"
//           value={inputMessage}
//           onChange={(e) => setInputMessage(e.target.value)}
//           placeholder={pdfFile ? "Ask about your document..." : "Upload a PDF first"}
//           disabled={!pdfFile}
//           className="chat-input"
//         />
//         <button 
//           type="submit" 
//           disabled={!pdfFile || !inputMessage.trim()}
//           className="send-button"
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ChatInterface;
import React, { useState } from 'react';
import { FileText, CheckCircle } from 'lucide-react'; // Remove X import
import './ChatInterface.css';

const ChatInterface = ({ pdfFile, currentPage, onPageChange, documentInfo }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showPreview, setShowPreview] = useState(true);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = { type: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input
    setInputMessage('');
    
    // Hide preview when user starts chatting
    setShowPreview(false);
    
    // Simulate AI response (replace with your actual API call)
    setTimeout(() => {
      const aiResponse = { 
        type: 'ai', 
        content: `This is a response about: ${inputMessage}`,
        citations: [{ page: currentPage, text: `Page ${currentPage}` }]
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
    setShowPreview(false);
  };

  // REMOVE handleClosePreview function since we don't want the close button

  // Show document preview if available and showPreview is true
  if (pdfFile && documentInfo && showPreview) {
    const { title, pages, summary, readyMessage, suggestions } = documentInfo;
    
    return (
      <div className="chat-interface">
        <div className="document-preview-chat">
          <div className="preview-header">
            <div className="document-status">
              <FileText size={20} className="document-icon" />
              <CheckCircle className="check-icon" size={16} />
              <span className="ready-message">{readyMessage}</span>
            </div>
            {/* REMOVE the close button - no more X button */}
          </div>

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
                <div 
                  key={index} 
                  className="suggestion-item clickable"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
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
        </div>
        
        {/* ADD: Input form at the bottom even in preview mode */}
        <form className="chat-input-form" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about your document..."
            className="chat-input"
          />
          <button 
            type="submit" 
            disabled={!inputMessage.trim()}
            className="send-button"
          >
            Send
          </button>
        </form>
      </div>
    );
  }

  // Regular chat interface (rest remains the same)
  return (
    <div className="chat-interface">
      <div className="chat-header">
        <h2>Chat with your document</h2>
      </div>
      
      <div className="chat-messages">
        {messages.length === 0 && !pdfFile && (
          <div className="empty-state">
            <p>Upload a PDF to start chatting</p>
          </div>
        )}
        
        {messages.length === 0 && pdfFile && (
          <div className="empty-state">
            <p>Ask me anything about your document!</p>
          </div>
        )}
        
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            <div className="message-content">
              {message.content}
              {message.citations && (
                <div className="citations">
                  {message.citations.map((citation, i) => (
                    <button 
                      key={i} 
                      className="citation-btn"
                      onClick={() => onPageChange(citation.page)}
                    >
                      {citation.text}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <form className="chat-input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={pdfFile ? "Ask about your document..." : "Upload a PDF first"}
          disabled={!pdfFile}
          className="chat-input"
        />
        <button 
          type="submit" 
          disabled={!pdfFile || !inputMessage.trim()}
          className="send-button"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
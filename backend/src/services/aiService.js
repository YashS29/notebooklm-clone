// Mock AI service - replace with actual OpenAI/other AI service
exports.generateResponse = async (question, pdfContent) => {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const responses = {
      "What is the main topic of this document?": "This document appears to be a resume highlighting technical skills and professional experience.",
      "Can you summarize the key points?": "The document shows experience with web development technologies including React, Node.js, and cloud services.",
      "What are the conclusions or recommendations?": "Based on the document, this shows strong technical capabilities in modern web development."
    };
    
    const response = responses[question] || `Based on the document content: ${question}`;
    
    return {
      text: response,
      citations: [{ page: 1, text: "Page 1" }]
    };
  };
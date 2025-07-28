const aiService = require('../services/aiService');
const pdfService = require('../services/pdfService');

exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const pdfFile = req.file;
    
    let pdfContent = '';
    if (pdfFile) {
      pdfContent = await pdfService.extractText(pdfFile.buffer);
    }
    
    const response = await aiService.generateResponse(message, pdfContent);
    
    res.json({
      text: response.text,
      citations: response.citations || []
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
};
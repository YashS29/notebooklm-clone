const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const upload = require('../middleware/upload');
const { uploadPDF, processPDF } = require('../controllers/pdfController');

// Upload PDF route
router.post('/upload', upload.single('pdf'), uploadPDF);

// Process PDF route
router.post('/process', processPDF);

// Serve PDF file route
router.get('/file/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    
    // Try multiple possible paths
    const possiblePaths = [
      path.resolve(__dirname, '../../uploads', filename),  // backend/uploads
      path.resolve(__dirname, '../uploads', filename),     // src/uploads
      path.resolve(process.cwd(), 'uploads', filename),    // project root/uploads
      path.resolve(__dirname, '../../../uploads', filename) // project root/uploads (alternative)
    ];
    
    console.log('🔍 Trying to find file:', filename);
    console.log('🔍 __dirname:', __dirname);
    
    let foundPath = null;
    for (const testPath of possiblePaths) {
      console.log('🔍 Testing path:', testPath);
      if (fs.existsSync(testPath)) {
        foundPath = testPath;
        console.log('✅ Found file at:', foundPath);
        break;
      }
    }
    
    if (!foundPath) {
      console.error('❌ File not found in any location');
      return res.status(404).json({ error: 'File not found' });
    }
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.sendFile(foundPath);
    
  } catch (error) {
    console.error('Error serving PDF:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
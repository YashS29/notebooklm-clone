
// const path = require('path');
// const fs = require('fs');
// const pdf = require('pdf-parse');

// exports.uploadPDF = async (req, res) => {
//   try {
//     const file = req.file;
    
//     if (!file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }

//     // Extract text from PDF
//     const dataBuffer = fs.readFileSync(file.path);
//     const pdfData = await pdf(dataBuffer);
    
//     // Extract skills and qualifications using simple text analysis
//     const extractedInfo = extractDocumentInfo(pdfData.text);
    
//     console.log('File uploaded:', {
//       filename: file.filename,
//       path: file.path,
//       size: file.size,
//       pages: pdfData.numpages
//     });

//     res.status(200).json({
//       message: 'PDF uploaded successfully',
//       fileName: file.filename,
//       filePath: file.path,
//       documentInfo: {
//         title: file.originalname,
//         pages: pdfData.numpages,
//         summary: extractedInfo,
//         readyMessage: "Your document is ready!",
//         suggestions: [
//           "What is the main topic of this document?",
//           "Can you summarize the key points?",
//           "What are the conclusions or recommendations?"
//         ]
//       }
//     });
//   } catch (error) {
//     console.error('Upload error:', error);
//     res.status(500).json({ error: 'Failed to upload PDF' });
//   }
// };

// exports.processPDF = (req, res) => {
//   try {
//     // Dummy response — replace with actual PDF logic later
//     res.json({ message: 'PDF processing complete' });
//   } catch (error) {
//     console.error('Process error:', error);
//     res.status(500).json({ error: 'Failed to process PDF' });
//   }
// };

// // Helper function to extract skills and qualifications
// function extractDocumentInfo(text) {
//   const lowerText = text.toLowerCase();
  
//   // Technical skills keywords
//   const techKeywords = [
//     'javascript', 'react', 'node.js', 'python', 'java', 'html', 'css',
//     'typescript', 'angular', 'vue', 'mongodb', 'sql', 'aws', 'docker',
//     'kubernetes', 'git', 'api', 'rest', 'graphql', 'redux', 'express',
//     'django', 'flask', 'spring', 'mysql', 'postgresql', 'redis', 'nginx',
//     'jenkins', 'ci/cd', 'agile', 'scrum', 'testing', 'jest', 'cypress'
//   ];

//   // Soft skills keywords
//   const softKeywords = [
//     'leadership', 'teamwork', 'communication', 'problem solving',
//     'project management', 'analytical', 'creative', 'collaborative',
//     'adaptable', 'detail-oriented', 'self-motivated', 'organized'
//   ];

//   // Education keywords
//   const educationKeywords = [
//     'bachelor', 'master', 'degree', 'university', 'college', 'certification',
//     'diploma', 'phd', 'doctorate', 'graduate', 'undergraduate', 'computer science',
//     'engineering', 'information technology', 'software', 'data science'
//   ];

//   // Experience keywords
//   const experienceKeywords = [
//     'experience', 'years', 'worked', 'developed', 'implemented', 'managed',
//     'led', 'created', 'designed', 'built', 'optimized', 'maintained',
//     'collaborated', 'architected', 'deployed', 'integrated'
//   ];

//   // Find matches
//   const foundTechSkills = techKeywords.filter(keyword => 
//     lowerText.includes(keyword)
//   );

//   const foundSoftSkills = softKeywords.filter(keyword => 
//     lowerText.includes(keyword)
//   );

//   const foundEducation = educationKeywords.filter(keyword => 
//     lowerText.includes(keyword)
//   );

//   const foundExperience = experienceKeywords.filter(keyword => 
//     lowerText.includes(keyword)
//   );

//   return {
//     technicalSkills: foundTechSkills.slice(0, 8), // Limit to top 8
//     softSkills: foundSoftSkills.slice(0, 5),
//     education: foundEducation.slice(0, 5),
//     experience: foundExperience.slice(0, 6),
//     summary: generateSummary(foundTechSkills, foundSoftSkills, foundEducation, foundExperience)
//   };
// }

// function generateSummary(tech, soft, edu, exp) {
//   let summary = "Document contains ";
  
//   if (tech.length > 0) {
//     summary += `technical skills including ${tech.slice(0, 3).join(', ')}`;
//   }
  
//   if (edu.length > 0) {
//     summary += tech.length > 0 ? `, educational background in ${edu[0]}` : `educational background in ${edu[0]}`;
//   }
  
//   if (exp.length > 0) {
//     summary += (tech.length > 0 || edu.length > 0) ? `, and professional experience` : `professional experience`;
//   }
  
//   if (soft.length > 0) {
//     summary += ` with emphasis on ${soft.slice(0, 2).join(' and ')}`;
//   }
  
//   return summary + ".";
// }

const path = require('path');
const fs = require('fs');
const pdf = require('pdf-parse');

exports.uploadPDF = async (req, res) => {
  try {
    const file = req.file;
    
    console.log('Upload request received:', file ? file.originalname : 'No file');
    
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Check if file exists
    if (!fs.existsSync(file.path)) {
      console.error('File not found at path:', file.path);
      return res.status(500).json({ error: 'File upload failed - file not saved' });
    }

    // Extract text from PDF
    const dataBuffer = fs.readFileSync(file.path);
    const pdfData = await pdf(dataBuffer);
    
    // Extract skills and qualifications using simple text analysis
    const extractedInfo = extractDocumentInfo(pdfData.text);
    
    console.log('File uploaded successfully:', {
      filename: file.filename,
      originalname: file.originalname,
      path: file.path,
      size: file.size,
      pages: pdfData.numpages
    });

    res.status(200).json({
      message: 'PDF uploaded successfully',
      fileName: file.filename,
      filePath: file.path,
      documentInfo: {
        fileName: file.filename, // Add this for PDFViewer
        title: file.originalname,
        pages: pdfData.numpages,
        summary: extractedInfo,
        readyMessage: "Your document is ready!",
        suggestions: [
          "What is the main topic of this document?",
          "Can you summarize the key points?",
          "What are the conclusions or recommendations?"
        ]
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload PDF: ' + error.message });
  }
};

// ... rest of your existing functions remain the same
exports.processPDF = (req, res) => {
  try {
    // Dummy response — replace with actual PDF logic later
    res.json({ message: 'PDF processing complete' });
  } catch (error) {
    console.error('Process error:', error);
    res.status(500).json({ error: 'Failed to process PDF' });
  }
};

// Helper function to extract skills and qualifications
function extractDocumentInfo(text) {
  const lowerText = text.toLowerCase();
  
  // Technical skills keywords
  const techKeywords = [
    'javascript', 'react', 'node.js', 'python', 'java', 'html', 'css',
    'typescript', 'angular', 'vue', 'mongodb', 'sql', 'aws', 'docker',
    'kubernetes', 'git', 'api', 'rest', 'graphql', 'redux', 'express',
    'django', 'flask', 'spring', 'mysql', 'postgresql', 'redis', 'nginx',
    'jenkins', 'ci/cd', 'agile', 'scrum', 'testing', 'jest', 'cypress'
  ];

  // Soft skills keywords
  const softKeywords = [
    'leadership', 'teamwork', 'communication', 'problem solving',
    'project management', 'analytical', 'creative', 'collaborative',
    'adaptable', 'detail-oriented', 'self-motivated', 'organized'
  ];

  // Education keywords
  const educationKeywords = [
    'bachelor', 'master', 'degree', 'university', 'college', 'certification',
    'diploma', 'phd', 'doctorate', 'graduate', 'undergraduate', 'computer science',
    'engineering', 'information technology', 'software', 'data science'
  ];

  // Experience keywords
  const experienceKeywords = [
    'experience', 'years', 'worked', 'developed', 'implemented', 'managed',
    'led', 'created', 'designed', 'built', 'optimized', 'maintained',
    'collaborated', 'architected', 'deployed', 'integrated'
  ];

  // Find matches
  const foundTechSkills = techKeywords.filter(keyword => 
    lowerText.includes(keyword)
  );

  const foundSoftSkills = softKeywords.filter(keyword => 
    lowerText.includes(keyword)
  );

  const foundEducation = educationKeywords.filter(keyword => 
    lowerText.includes(keyword)
  );

  const foundExperience = experienceKeywords.filter(keyword => 
    lowerText.includes(keyword)
  );

  return {
    technicalSkills: foundTechSkills.slice(0, 8), // Limit to top 8
    softSkills: foundSoftSkills.slice(0, 5),
    education: foundEducation.slice(0, 5),
    experience: foundExperience.slice(0, 6),
    summary: generateSummary(foundTechSkills, foundSoftSkills, foundEducation, foundExperience)
  };
}

function generateSummary(tech, soft, edu, exp) {
  let summary = "Document contains ";
  
  if (tech.length > 0) {
    summary += `technical skills including ${tech.slice(0, 3).join(', ')}`;
  }
  
  if (edu.length > 0) {
    summary += tech.length > 0 ? `, educational background in ${edu[0]}` : `educational background in ${edu[0]}`;
  }
  
  if (exp.length > 0) {
    summary += (tech.length > 0 || edu.length > 0) ? `, and professional experience` : `professional experience`;
  }
  
  if (soft.length > 0) {
    summary += ` with emphasis on ${soft.slice(0, 2).join(' and ')}`;
  }
  
  return summary + ".";
}
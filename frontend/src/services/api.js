const API_BASE_URL = 'http://localhost:5000/api';

export const uploadPDF = async (file) => {
  try {
    console.log('Starting file upload...', file.name);
    console.log('Uploading file to:', `${API_BASE_URL}/pdf/upload`);
        
    const formData = new FormData();
    formData.append('pdf', file);
        
    const response = await fetch(`${API_BASE_URL}/pdf/upload`, {
      method: 'POST',
      body: formData,
    });
        
    console.log('Response status:', response.status);
        
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Upload failed:', errorText);
      throw new Error(`Upload failed: ${response.status} - ${errorText}`);
    }
        
    const result = await response.json();
    console.log('Upload successful:', result);
    return result;
      
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ✅ Add PDF file fetching function
export const fetchPDFFile = async (filename) => {
  try {
    console.log('Fetching PDF file:', filename);
    const response = await fetch(`${API_BASE_URL}/pdf/file/${filename}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/pdf',
      },
    });
    
    console.log('PDF fetch response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    console.log('PDF file fetched successfully');
    return url;
    
  } catch (error) {
    console.error('Error fetching PDF file:', error);
    throw error;
  }
};

export const sendMessage = async (message, pdfFile) => {
  try {
    console.log('Sending message:', message);
    const formData = new FormData();
    formData.append('message', message);
    if (pdfFile) {
      formData.append('pdf', pdfFile);
    }
        
    const response = await fetch(`${API_BASE_URL}/chat/message`, {
      method: 'POST',
      body: formData,
    });
        
    console.log('Chat response status:', response.status);
        
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Chat failed:', errorText);
      throw new Error(`Chat failed: ${response.status} - ${errorText}`);
    }
        
    const result = await response.json();
    console.log('Chat successful:', result);
    return result;
      
  } catch (error) {
    console.error('Chat API Error:', error);
    throw error;
  }
};

// const API_BASE_URL = 'http://localhost:5000/api';

// export const uploadPDF = async (file) => {
//   try {
//     console.log('Uploading file to:', `${API_BASE_URL}/pdf/upload`);
    
//     const formData = new FormData();
//     formData.append('pdf', file);
    
//     const response = await fetch(`${API_BASE_URL}/pdf/upload`, {
//       method: 'POST',
//       body: formData,
//     });
    
//     console.log('Response status:', response.status);
    
//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error('Upload failed:', errorText);
//       throw new Error(`Upload failed: ${response.status} - ${errorText}`);
//     }
    
//     const result = await response.json();
//     console.log('Upload successful:', result);
//     return result;
    
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };

// export const sendMessage = async (message, pdfFile) => {
//   try {
//     const formData = new FormData();
//     formData.append('message', message);
//     if (pdfFile) {
//       formData.append('pdf', pdfFile);
//     }
    
//     const response = await fetch(`${API_BASE_URL}/chat/message`, {
//       method: 'POST',
//       body: formData,
//     });
    
//     if (!response.ok) {
//       throw new Error(`Chat failed: ${response.status}`);
//     }
    
//     return response.json();
    
//   } catch (error) {
//     console.error('Chat API Error:', error);
//     throw error;
//   }
// };
<<<<<<< HEAD
# NotebookLM Clone

A powerful document analysis and chat application that allows users to upload PDF documents and have intelligent conversations about their content. Built with React frontend and Node.js backend, featuring AI-powered document understanding and vector-based search capabilities.

## 🚀 Deploy on Vercel Application URL

 📋 https://notebooklm-clone-jjuy.vercel.app/


## 🚀 Features

- **PDF Document Upload**: Upload and process PDF documents
- **Intelligent Chat Interface**: Ask questions about your uploaded documents
- **Document Preview**: View your PDFs directly in the application
- **Citation Support**: Get referenced answers with source citations
- **Vector Search**: Advanced document search using vector embeddings
- **Real-time Processing**: Fast document analysis and response generation

## 🏗️ Project Structure

```
notebooklm-clone/
├── frontend/                 # React frontend application
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   └── _redirects
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── ChatInterface.js
│   │   │   ├── CitationButton.js
│   │   │   ├── DocumentPreview.js
│   │   │   ├── PDFViewer.js
│   │   │   └── UploadArea.js
│   │   ├── hooks/           # Custom React hooks
│   │   │   └── usePDF.js
│   │   ├── services/        # API service layer
│   │   │   └── api.js
│   │   ├── styles/          # Global styles
│   │   │   └── globals.css
│   │   ├── App.js
│   │   └── index.js
│   └── build/               # Production build files
└── backend/                 # Node.js backend application
    ├── src/
    │   ├── controllers/     # Route controllers
    │   │   ├── chatController.js
    │   │   └── pdfController.js
    │   ├── middleware/      # Express middleware
    │   │   ├── errorHandler.js
    │   │   └── upload.js
    │   ├── routes/          # API routes
    │   │   ├── chat.js
    │   │   └── pdf.js
    │   ├── services/        # Business logic services
    │   │   ├── aiService.js
    │   │   ├── pdfService.js
    │   │   └── vectorService.js
    │   ├── utils/           # Utility functions
    │   │   └── helpers.js
    │   └── app.js           # Express app entry point
    └── uploads/             # Uploaded PDF files storage
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/notebooklm-clone.git
cd notebooklm-clone
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Configure Environment Variables:**

Edit the `.env` file with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# AI Service Configuration (Add your API keys)
OPENAI_API_KEY=your_openai_api_key_here
# OR
GOOGLE_AI_API_KEY=your_google_ai_api_key_here

# Vector Database Configuration
VECTOR_DB_URL=your_vector_db_url_here

# File Upload Configuration
MAX_FILE_SIZE=10485760  # 10MB
UPLOAD_DIR=./uploads
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

**Configure Frontend Environment:**

Edit the `.env.local` file:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_MAX_FILE_SIZE=10485760
```

## 🚀 Running the Application

### Development Mode

**Start the Backend Server:**

```bash
# From backend directory
cd backend
npm run dev
# Server will run on http://localhost:5000
```

**Start the Frontend Development Server:**

```bash
# From frontend directory (in a new terminal)
cd frontend
npm start
# Application will open on http://localhost:3000
```

### Production Mode

**Build the Frontend:**

```bash
cd frontend
npm run build
```

**Start the Backend in Production:**

```bash
cd backend
npm run start
```

## 📚 API Endpoints

### PDF Management
- `POST /api/pdf/upload` - Upload a PDF document
- `GET /api/pdf/:id` - Get PDF document information
- `DELETE /api/pdf/:id` - Delete a PDF document

### Chat Interface
- `POST /api/chat/query` - Send a chat query about uploaded documents
- `GET /api/chat/history/:documentId` - Get chat history for a document

## 🎯 Usage

### 1. Upload Documents
- Click on the upload area or drag and drop PDF files
- Wait for the document to be processed and indexed
- View the document preview in the sidebar

### 2. Start Chatting
- Type your questions about the uploaded document
- Receive AI-powered responses with citations
- Click on citation buttons to view relevant document sections

### 3. Document Management
- View all uploaded documents in the document list
- Switch between different documents for chat
- Delete documents when no longer needed

## 🔧 Configuration

### File Upload Limits
Modify the file size limits in your environment variables:
```env
MAX_FILE_SIZE=10485760  # 10MB in bytes
```

### AI Service Configuration
Choose your preferred AI service by configuring the appropriate API key:
- OpenAI GPT models
- Google AI models
- Custom AI endpoints

### Vector Database
Configure your vector database for document embeddings and search:
```env
VECTOR_DB_URL=your_vector_database_connection_string
```

## 🛡️ Security Considerations

- API keys should never be committed to version control
- Use environment variables for all sensitive configuration
- Implement proper file validation for uploads
- Set appropriate CORS policies for production
- Use HTTPS in production environments

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)
The frontend is ready for deployment with the included `_redirects` file for SPA routing.

### Backend Deployment (Heroku/Railway/DigitalOcean)
Ensure environment variables are properly configured in your deployment platform.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

**Backend server won't start:**
- Check if the port is already in use
- Verify all environment variables are set
- Ensure database connections are properly configured

**Frontend build fails:**
- Clear node_modules and reinstall dependencies
- Check for any missing environment variables
- Verify API endpoint URLs are correct

**PDF upload fails:**
- Check file size limits
- Verify upload directory permissions
- Ensure PDF processing services are running

**Chat responses are slow:**
- Check AI service API key and limits
- Verify vector database performance
- Consider implementing caching for frequent queries

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the troubleshooting section above
- Review the configuration settings

---

**Happy coding! 🎉**
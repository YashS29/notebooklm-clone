const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pdfRoutes = require('./routes/pdf');
const chatRoutes = require('./routes/chat');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/pdf', pdfRoutes);
app.use('/api/chat', chatRoutes);

// Error handling
app.use(errorHandler);

module.exports = app;
// Global error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error('🔥 Error:', err.stack || err.message);
    res.status(500).json({
      success: false,
      message: err.message || 'Internal Server Error'
    });
  };
  
  module.exports = errorHandler;
  
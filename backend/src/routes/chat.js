const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { sendMessage } = require('../controllers/chatController');

router.post('/message', upload.single('pdf'), sendMessage);

module.exports = router;
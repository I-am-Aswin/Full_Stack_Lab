const express = require('express');
const router = express.Router();
const { startChat, sendMessage } = require('../controllers/chatController');
const auth = require('../middlewares/authMiddleware');

router.post('/start', auth, startChat);
router.post('/message', auth, sendMessage);

module.exports = router;

const express = require('express');
const router = express.Router();
const { createPaymentIntent } = require('../controllers/paymentController');
const auth = require('../middlewares/authMiddleware');

router.post('/create-intent', auth, createPaymentIntent);

module.exports = router;

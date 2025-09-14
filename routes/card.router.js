const express = require('express');
const router = express.Router();
const CardController = require('../controllers/cardController.js');

// Route to fetch user QR Details
router.get('/:id', CardController.fetchUserDetails);

module.exports = router;

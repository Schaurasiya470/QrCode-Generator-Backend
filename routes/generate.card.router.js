
const express = require('express');
const router = express.Router();
const generateCardController = require('../controllers/generateCardController.js');

// Define cart routes
router.post('/', generateCardController.saveUserDetails);

module.exports = router;
const express = require('express');
const router = express.Router();
const formHandler = require('../controllers/form-handler');

// Main page route
router.get('/', (req, res) => {
  res.render('index');
});

// Form submission route
router.post('/submit-form', formHandler.processForm);

module.exports = router;
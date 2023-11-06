var express = require('express');
var router = express.Router();
const favoritesController = require('../controllers/favorites');

// GET /favorites
router.get('/', favoritesController.index)
module.exports = router;
var express = require('express');
var router = express.Router();
const favoritesController = require('../controllers/favorites');
// Require the auth middleware
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /favorites
router.get('/', favoritesController.index);
// POST /favorites/remove/:id
router.post('/remove/:id', ensureLoggedIn, favoritesController.removeIdeaFromFavorites);

module.exports = router;
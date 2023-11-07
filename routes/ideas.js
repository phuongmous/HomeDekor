var express = require('express');
var router = express.Router();
const upload = require('../utilities/multer');
const ideasController = require('../controllers/ideas');
// Require the auth middleware
const ensureLoggedIn = require('../config/ensureLoggedIn');

//Get /ideas/all
router.get('/all', ideasController.allIdeas);

// GET /ideas
router.get('/', ideasController.index);

// GET /ideas/new
router.get('/new', ensureLoggedIn, ideasController.new);

// GET /ideas/search'
router.get('/search', ideasController.searchIdeas);

// GET /ideas/:id
router.get('/:id', ideasController.show);

// POST /ideas
router.post('/', ensureLoggedIn, upload.single('image'), ideasController.create);

// Post /ideas/:id
router.post('/:id', ensureLoggedIn, ideasController.addToFavorites);

module.exports = router;

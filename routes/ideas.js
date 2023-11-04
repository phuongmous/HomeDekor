var express = require('express');
var router = express.Router();
const ideasController = require('../controllers/ideas');

// GET /ideas
router.get('/', ideasController.index);
// GET /ideas/new
router.get('/new', ideasController.new);
// GET /ideas/:id
router.get('/:id', ideasController.show);
// POST /ideas
router.post('/', ideasController.create);
module.exports = router;

const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments');

// POST /ideas/:id/comments (create a comment for an idea post)
router.post('/ideas/:id/comments', commentsController.create)

module.exports = router;
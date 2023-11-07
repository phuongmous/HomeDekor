const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments');
// Require the auth middleware
const ensureLoggedIn = require('../config/ensureLoggedIn');

// POST /ideas/:id/comments (create a comment for an idea post)
router.post('/ideas/:id/comments', ensureLoggedIn, commentsController.create)
// DELETE /comments/:id
router.delete('/comments/:id', ensureLoggedIn, commentsController.delete)

module.exports = router;
const Idea = require('../models/idea');

module.exports = {
    create,
    delete: deleteComment
};

async function create (req, res) {
    // Find the idea using the provided idea ID in the request parameters
    const idea = await Idea.findById(req.params.id);
    // Add the user-centric info to req.body (the new comment)
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    // Add the new comment to the idea's comments array
    idea.comments.push(req.body);
    try {
        await idea.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect(`/ideas/${idea._id}`);
};

async function deleteComment(req, res) {
    // Find the idea that contains the comment to be deleted
    const idea = await Idea.findOne({ 'comments._id': req.params.id, 'comments.user': req.user._id});
    console.log('Idea:', idea);
    if (!idea) return res.redirect(`/ideas/${req.params.id}`);
    // Remove the specified comment from the idea's comments array
    idea.comments.remove(req.params.id);
    await idea.save();
    res.redirect(`/ideas/${idea._id}`);
};
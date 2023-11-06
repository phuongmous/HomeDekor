const Idea = require('../models/idea');

module.exports = {
    create,
    delete: deleteComment
};

async function create (req, res) {
    const idea = await Idea.findById(req.params.id);

    // Add the user-centric info to req.body (the new comment)
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    idea.comments.push(req.body);
    try {
        await idea.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect(`/ideas/${idea._id}`);
}

async function deleteComment(req, res) {
    console.log('Comment ID to Delete:', req.params.id);
    console.log('Comment User ID', req.user._id)
    const idea = await Idea.findOne({ 'comments._id': req.params.id, 'comments.user': req.user._id});
    console.log('Idea:', idea);
    if (!idea) return res.redirect(`/ideas/${req.params.id}`);
    console.log('Before removing comment:', idea.comments);
    idea.comments.remove(req.params.id);
    console.log('After removing comment:', idea.comments);
    await idea.save();
    res.redirect(`/ideas/${idea._id}`);
}
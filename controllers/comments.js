const Idea = require('../models/idea');

module.exports = {
    create
};

async function create (req, res) {
    const idea = await Idea.findById(req.params.id);
    idea.comments.push(req.body);
    try {
        await idea.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect(`/ideas/${idea._id}`);
}
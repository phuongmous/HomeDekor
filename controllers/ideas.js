const Idea = require('../models/idea');
const User = require('../models/user');

module.exports = {
    index,
    show,
    new: newIdea,
    create,
    addToFavorites
};

async function index(req,res) {
    const ideas = await Idea.find({});
    res.render('ideas/index', { title: 'All Ideas', ideas });
}

async function show(req,res) {
    const idea = await Idea.findById(req.params.id);
    res.render('ideas/show', { title: '', idea });
}

function newIdea(req,res) {
    const newIdea = new Idea();
    res.render('ideas/new', { title: 'New Idea', errorMsg: ''});
}

async function create(req,res) {
    const{title, content} = req.body;
    try {
        await Idea.create(req.body);
        res.redirect('/ideas');
    }
    catch (err) {
        console.log(err);
        res.render('ideas/new', { errorMsg: err.message });
    }
}

async function addToFavorites(req, res) {
    const ideaId = req.params.id;
    console.log('ideaId', ideaId);
    const userId = req.user._id;
    console.log('userId', userId);
    // Find the user by their ID
    const user = await User.findById(userId);
    // Add the idea's ID to the user's favorites
    if (!user.favorites.includes(ideaId)) {
    user.favorites.push(ideaId);
    await user.save();
    }
    res.redirect(`/ideas/${ideaId}`);
}
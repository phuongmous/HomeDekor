const Idea = require('../models/idea');
const User = require('../models/user');
const cloudinary = require('../utilities/cloudinary');

module.exports = {
    index,
    allIdeas,
    searchIdeas,
    show,
    new: newIdea,
    create,
    edit,
    update,
    delete: deleteIdea,
    addToFavorites
};

async function deleteIdea(req, res) {
    console.log('Idea ID', req.params.id, 'userIdea', req.user._id);
    await Idea.findOneAndDelete(
        {_id: req.params.id, userIdea: req.user._id}
    )
    res.redirect(`/ideas`);
}

async function update(req, res) {
    console.log('TITLE', req.file);
    try {
        const idea = {
            title: req.body.title,
            content: req.body.content,
            }
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            idea.image = result.secure_url;
            idea.cloudinary_id = result.public_id;
        }
        const updatedIdea = await Idea.findOneAndUpdate(
            {_id: req.params.id, userIdea: req.user._id},
            idea,
            {new: true}
        );
        return res.redirect(`/ideas/${req.params.id}`);
    } catch (err) {
        console.log(err);
    }
}

async function edit(req, res) {
   const idea = await Idea.findOne({_id: req.params.id, userIdea: req.user._id});
   console.log('_id:', req.params.id, 'userIdea:', req.user._id);
   if (!idea) return res.redirect('/ideas');
   res.render('ideas/edit', { title: 'Edit Idea', idea });
}

async function searchIdeas(req, res) {
    let ideaQuery = req.query.title ? {title: new RegExp(req.query.title, 'i')} : {};
    const ideas = await Idea.find(ideaQuery);
    res.render('ideas/search-results', { title: 'Search results', 
      ideas,
      titleSearch: req.query.title // use to set content of search form
    });
}


async function allIdeas(req, res) {
    try {
        const ideas = await Idea.find({});
        res.render('ideas/all', { title: 'All Ideas', ideas });
      } catch (err) {
        console.log(err);
      }
}

async function index(req,res) {
    const ideas = await Idea.find({});
    res.render('ideas/index', { title: 'My Ideas', ideas });
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
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        let idea = new Idea({
            userIdea: req.user._id,
            title: req.body.title,
            content: req.body.content,
            image: result.secure_url,
            cloudinary_id: result.public_id
        });
        await idea.save();
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
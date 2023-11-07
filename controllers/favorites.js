const Idea = require('../models/idea');
const User = require('../models/user');

module.exports = {
    index,
    removeIdeaFromFavorites
}

async function index(req, res) {
    const userId = req.user._id;
    // Find the user by their ID
    const user = await User.findById(userId).populate('favorites');
    console.log('user', user);
    const ideas = user.favorites;
    console.log('ideas', ideas);
    res.render ('favorites/index', { title: 'My Favorites', ideas})
}

async function removeIdeaFromFavorites(req, res) {
    const userId = req.user._id;
    const ideaId = req.params.id;

    try {
        const user = await User.findById(userId);
        // Remove the idea from the favorites array
        user.favorites.remove(ideaId); 
        await user.save();
        res.redirect('/favorites');
    } catch (err) {
        coonsole.log(err);
    }
};

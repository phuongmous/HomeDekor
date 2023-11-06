const Idea = require('../models/idea');
const User = require('../models/user');

module.exports = {
    index
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
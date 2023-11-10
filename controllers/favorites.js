const Idea = require('../models/idea');
const User = require('../models/user');

module.exports = {
    index,
    removeIdeaFromFavorites
};

// Function to display the user's favorite ideas
async function index(req, res) {
    const userId = req.user._id;
    // Find the user by their ID and populate their favorite ideas
    const user = await User.findById(userId).populate('favorites');
    const ideas = user.favorites;
    // Render the 'favorites/index' view, passing the title and the user's favorite ideas
    res.render ('favorites/index', { title: 'My Favorites', ideas})
};

async function removeIdeaFromFavorites(req, res) {
    const userId = req.user._id;
    const ideaId = req.params.id;
    try {
        const user = await User.findById(userId);
        // Check if the idea is in the user's favorites and remove it
        if (user.favorites.includes(ideaId)) {
        user.favorites.remove(ideaId);
        await user.save();
        }
        res.redirect('/favorites');
    } catch (err) {
        console.log(err);
    }
};

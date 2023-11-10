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

// Function to delete an idea
async function deleteIdea(req, res) {
    // Find and delete the idea based on the idea ID and user ID
    await Idea.findOneAndDelete(
        {_id: req.params.id, userIdea: req.user._id}
    )
    res.redirect(`/ideas`);
};

// Function to update an idea
async function update(req, res) {
    console.log('TITLE', req.file);
    try {
        // Create an idea object with the updated data
        const idea = {
            title: req.body.title,
            content: req.body.content,
            }

        // If a new image is uploaded, upload it to Cloudinary and update the idea
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            idea.image = result.secure_url;
            idea.cloudinary_id = result.public_id;
        }

        // Find and update the idea based on the idea ID and user ID
        const updatedIdea = await Idea.findOneAndUpdate(
            {_id: req.params.id, userIdea: req.user._id},
            idea,
            {new: true}
        );
        return res.redirect(`/ideas/${req.params.id}`);
    } catch (err) {
        console.log(err);
    }
};

// Function to render the edit idea page
async function edit(req, res) {
   const idea = await Idea.findOne({_id: req.params.id, userIdea: req.user._id});
   console.log('_id:', req.params.id, 'userIdea:', req.user._id);
   if (!idea) return res.redirect('/ideas');
   // Render the 'ideas/edit' view with the idea data
   res.render('ideas/edit', { title: 'Edit Idea', idea });
};

// Function to search for ideas
async function searchIdeas(req, res) {
    // Construct a query based on the title parameter in the request
    let ideaQuery = req.query.title ? {title: new RegExp(req.query.title, 'i')} : {};
    // Find ideas based on the constructed query
    const ideas = await Idea.find(ideaQuery);
    // Render the 'ideas/search-results' view with the search results
    res.render('ideas/search-results', { title: 'Search results', 
      ideas,
      titleSearch: req.query.title // use to set content of search form
    });
};

// Function to render all ideas
async function allIdeas(req, res) {
    try {
        // Find all ideas
        const ideas = await Idea.find({});
        res.render('ideas/all', { title: 'All Ideas', ideas });
      } catch (err) {
        console.log(err);
      }
};

// Function to render the user's ideas
async function index(req,res) {
    // Find all ideas created by the user
    const ideas = await Idea.find({});
    res.render('ideas/index', { title: 'My Ideas', ideas });
};

// Function to render a single idea
async function show(req,res) {
    // Find an idea by its ID
    const idea = await Idea.findById(req.params.id);
    res.render('ideas/show', { title: '', idea });
};

// Function to render the adding idea page
function newIdea(req,res) {
    // Create a new Idea object
    const newIdea = new Idea();
    res.render('ideas/new', { title: 'Add Idea', errorMsg: ''});
};

// Function to create a new idea
async function create(req,res) {
    try {
        // Upload the image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        // Create a new idea with the user's ID, title, content, and image data
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
};

// Function to add an idea to the user's favorites
async function addToFavorites(req, res) {
    const ideaId = req.params.id;
    const userId = req.user._id;
    // Find the user in the database based on their ID
    const user = await User.findById(userId);
    // Check if the idea is not already in the user's favorites
    if (!user.favorites.includes(ideaId)) {
        // Add the idea's ID to the user's favorites array
        user.favorites.push(ideaId);
        await user.save();
    }
    res.redirect(`/ideas/${ideaId}`);
};
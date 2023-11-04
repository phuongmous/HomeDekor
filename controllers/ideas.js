const Idea = require('../models/idea');

module.exports = {
    index,
    show,
    new: newIdea,
    create
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
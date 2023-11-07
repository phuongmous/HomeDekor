const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: String,
    userAvatar: String
}, {
    timestamps: true
});

const ideaSchema = new Schema({
    userIdea: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    image: {
        type: String
    },
    cloudinary_id: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    comments: [commentSchema],
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Idea', ideaSchema);
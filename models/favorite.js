const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    ideas: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Idea'
        }
    ]
});

module.exports = mongoose.model('Favorite', favoriteSchema);
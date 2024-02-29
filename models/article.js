// JavaScript source code
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Article = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    content: {
        type: String,
    },
    time: {
        type: Date,
        default: Date.now,
    }
});
module.exports = mongoose.model('Article', Article);

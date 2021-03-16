const mongoose = require('mongoose');
const { Schema } = mongoose;

const ARTICLES = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type:String
    },
    markdown: {
        type: String,
        required: true
    },
    creatorType:{
        type: String
    },
    createdBy: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }    
})


module.exports = mongoose.model('articles', ARTICLES);


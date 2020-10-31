const mongoose = require('mongoose');
const User = require('./user');

const questionSchema  = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    correctAnswer:{
        type: String,
        required: false
    },
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Question', questionSchema);
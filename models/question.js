const mongoose = require('mongoose');

const questionSchema  = new mongoose.Schema({
    titre: {
        type:String,
        required: true
    },
    bonReponse:{
        type: String,
        required: false
    },
    note:{
        type:Number,
        required: false
    },
    enseignantID:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Question', questionSchema);
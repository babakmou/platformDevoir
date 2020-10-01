const mongoose = require('mongoose');
const Enseignant = require('./enseignant');

const questionSchema  = new mongoose.Schema({
    titre: {
        type:String,
        required: true
    },
    bonneReponse:{
        type: String,
        required: false
    },
    enseignant:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Enseignant'
    }
});

module.exports = mongoose.model('Question', questionSchema);
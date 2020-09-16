const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');
const Question = require('./question');

const aDevelopperSchema = extendSchema(Question, {
    reponse:{
        type: String,
        required:false
    },
    pieceJointe:{
        type:Object,
        required: false
    }
});

module.exports= mongoose.model('ADevelopper', aDevelopperSchema);
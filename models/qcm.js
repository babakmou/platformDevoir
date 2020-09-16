const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');
const Question = require('./question');

const qcmSchema = extendSchema(Question, {
    reponse1:{
        type:String,
        required: true
    },
    reponse2:{
        type:String,
        required: true
    },
    reponse3:{
        type:String,
        required: true
    },
    reponse4:{
        type:String,
        required: true
    }
});

module.exports= mongoose.model('QCM', qcmSchema);
const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');
const Question = require('./question');

const vraiFauxSchema = extendSchema(Question.schema, {
    reponse:{
        type:Boolean,
        required: false
    },
    bonneReponse:{
        type: String,
        required: false
    }
});

module.exports= mongoose.model('VraiFaux', vraiFauxSchema);
const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');
const Question = require('./question');

const vraiFauxSchema = extendSchema(Question, {
    reponse:{
        type:Boolean,
        required: false
    }
});

module.exports= mongoose.model('VraiFaux', vraiFauxSchema);
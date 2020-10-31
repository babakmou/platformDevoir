const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');
const Question = require('./question');

const trueFalseSchema = extendSchema(Question.schema, {
    answer:{
        type:Boolean,
        required: false
    },
    correctAnswer:{
        type: String,
        required: false
    }
});

module.exports= mongoose.model('TrueFalse', trueFalseSchema);
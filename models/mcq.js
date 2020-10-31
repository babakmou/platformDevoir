const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');
const Question = require('./question');

const mcqSchema = extendSchema(Question.schema, {
    answer1:{
        type:String,
        required: true
    },
    answer2:{
        type:String,
        required: true
    },
    answer3:{
        type:String,
        required: true
    },
    answer4:{
        type:String,
        required: true
    }
});

module.exports= mongoose.model('MCQ', mcqSchema);
const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');
const Question = require('./question');

const essaySchema = extendSchema(Question.schema, {
    answer:{
        type: String,
        required:false
    },
    attachment:{
        type:Object,
        required: false
    }
});

module.exports= mongoose.model('Essay', essaySchema);
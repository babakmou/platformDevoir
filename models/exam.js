const mongoose = require('mongoose');
const User = require('./user');


const childSchema = new mongoose.Schema(
    {
        question: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: 'onModel'
        },
        assignedScore: {
            type: Number,
            default: 0.0
        },
        gainedScore: {
            type: Number,
            default: 0.0
        },
        onModel: {
            type: String,
            required: true,
            enum: ['MCQ', 'Essay','TrueFalse']
        }
    }
);

const examSchema = new mongoose.Schema(
    {
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        title: {
            type: String,
            required: true
        },
        course: {
            type: String,
            required: false
        },
        deadline: {
            type: Date,
            required: true
        },
        totalScore: {
            type: Number,
            default: 0.0
        },
        status: {
            type: Boolean,
            default: true
        },
        questions: {
            type: [childSchema]
        }
    }
);

module.exports = mongoose.model('Exam', examSchema);
const mongoose = require('mongoose');
// const question = require('./question');
const Enseignant = require('./enseignant');
// const QCM = require('../models/qcm');
// const ADevelopper = require('../models/qcm');
// const VraiFaux = require('../models/qcm');

const childSchema = new mongoose.Schema(
    {
        question: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: 'onModel'
        },
        noteAssignee: {
            type: Number,
            default: 0.0
        },
        noteObtenue: {
            type: Number,
            default: 0.0
        },
        onModel: {
            type: String,
            required: true,
            enum: ['QCM', 'ADevelopper','VraiFaux']
        }
    }
);

const devoirSchema = new mongoose.Schema(
    {
        enseignant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Enseignant'
        },
        cours: {
            type: String,
            required: false
        },
        dateRemise: {
            type: Date,
            required: true
        },
        noteTotale: {
            type: Number,
            default: 0.0
        },
        statut: {
            type: Boolean,
            default: true
        },
        // questions:{
        //     type: Array,
        //     default:[{}]
        // }
        questions: {
            type: [childSchema],
            default: {}
        }
    }
);

module.exports = mongoose.model('Devoir', devoirSchema);
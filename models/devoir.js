const mongoose = require('mongoose');
const Enseignant = require('./enseignant');


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
        questions: {
            type: [childSchema],
            default: {}
        }
    }
);

module.exports = mongoose.model('Devoir', devoirSchema);
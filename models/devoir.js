const mongoose = require('mongoose');

const devoirSchema= new mongoose.Schema(
    {
        cours:{
            type:String,
            required: false
        },
        dateRemise:{
            type:Date,
            required: true
        },
        noteTotale:{
            type:Number,
            required: false
        },
        statut:{
            type:Boolean,
            required: true
        },
        questions:{
            type:Array,
            required:true
        },
        enseignantID:{
            type:String,
            required:true
        }
    }
);

module.exports= mongoose.model('Devoir', devoirSchema);
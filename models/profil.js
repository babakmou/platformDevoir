const mongoose = require('mongoose');

const profilSchema= new mongoose.Schema(
    {
        nom:{
            type:String,
            required: true
        },
        prenom:{
            type:String,
            required: true
        },
        courriel:{
            type:String,
            required: true
        },
        motDePasse:{
            type:String,
            required: true
        }
    }
);

module.exports= mongoose.model('Profil', profilSchema);
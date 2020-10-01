const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');
const Profil = require('./profil');

const etudiantSchema = extendSchema(Profil.schema, {
    travaux:{
      type:Array,
      Required:false
    }
  });

module.exports= mongoose.model('Etudiant', etudiantSchema);
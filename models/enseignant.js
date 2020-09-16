const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');
const Profil = require('./profil');

const enseignantSchema = extendSchema(Profil, {
    
  });

  module.exports= mongoose.model('Enseignant', enseignantSchema);
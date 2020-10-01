var express = require('express');
var router = express.Router();
const Enseignant = require('../models/enseignant');
const Etudiant = require('../models/etudiant');
const VraiFaux = require('../models/vraiFaux');



//Creer une question vrai/faux
router.post('/', async (req, res) => {

  const enseignant = await Enseignant.findById(req.body.enseignantId);
  if (!enseignant) return res.status(400).json({message:err.message});

  const vraiFaux = new VraiFaux({
    titre: req.body.titre,
    bonneReponse: req.body.bonneReponse,
    enseignant: req.body.enseignantId
  });

  try {
    const newVraiFaux = await vraiFaux.save();
    console.log(newVraiFaux);
    res.status(201).json(newVraiFaux._id);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

//Consulter toutes les questions a vrai/faux
router.get('/', async(req, res) =>{
  try {
    const vraiFaux = await VraiFaux.find();
    res.status(200).json(vraiFaux);
  }catch{
    res.status(500).json({message:err.message});
  }
});

//Consulter la question par ID
router.get('/:id', getVraiFaux, (req, res) => {
  res.status(200).json(res.vraiFaux);
});

//Supprimer un QCM
router.delete('/:id', getVraiFaux, async (req, res) => {
  try {
    await res.vraiFaux.remove()
    res.json({ message: "La QCM est supprime" })
    } catch(err) {
    res.status(500).json({ message: err.message })
    }
});

//Middleware
async function getVraiFaux(req, res, next) {
  try {
  var vraiFaux = await VraiFaux.findById(req.params.id)
  if (vraiFaux == null) {
  return res.status(404).json({ message: 'Question introuvable'})
  }
  } catch(err){
  return res.status(500).json({ message: err.message })
  }
  res.vraiFaux = vraiFaux;
  next();
  }

module.exports = router;
var express = require('express');
var router = express.Router();
const Enseignant = require('../models/enseignant');
const Etudiant = require('../models/etudiant');
const ADevelopper = require('../models/aDevelopper');


//Creer une question a developper
router.post('/', async (req, res) => {

  const enseignant = await Enseignant.findById(req.body.enseignantId);
  if (!enseignant) return res.status(400).json({message:err.message});

  const aDevelopper = new ADevelopper({
    titre: req.body.titre,
    enseignant: req.body.enseignantId
  });

  try {
    const newADevelopper = await aDevelopper.save()
    res.status(201).json(newADevelopper._id);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

//Consulter toutes les questions a developper
router.get('/', async(req, res) =>{
  try {
    const aDeveloppers = await ADevelopper.find();
    res.status(200).json(aDeveloppers);
  }catch{
    res.status(500).json({message:err.message});
  }
});

//Consulter la question par ID
router.get('/:id', getADevelopper, (req, res) => {
  res.status(200).json(res.aDevelopper);
});

//Supprimer une question
router.delete('/:id', getADevelopper, async (req, res) => {
  try {
    await res.aDevelopper.remove()
    res.json({ message: "La Question est supprime" })
    } catch(err) {
    res.status(500).json({ message: err.message })
    }
});

//Middleware
async function getADevelopper(req, res, next) {
  try {
  var aDevelopper = await ADevelopper.findById(req.params.id)
  if (aDevelopper == null) {
  return res.status(404).json({ message: 'Question introuvable'})
  }
  } catch(err){
  return res.status(500).json({ message: err.message })
  }
  res.aDevelopper = aDevelopper;
  next();
  }

module.exports = router;
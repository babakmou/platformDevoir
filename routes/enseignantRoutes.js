var express = require('express');
var router = express.Router();
const Enseignant = require('../models/enseignant');


//S'inscrire un enseignant
router.post('/', async (req, res) => {

  const enseignant = new Enseignant({
    nom: req.body.nom,
    prenom: req.body.prenom,
    courriel: req.body.courriel,
    motDePasse: req.body.motDePasse,
  });

  try {
    const newEnseignant = await enseignant.save()
    res.status(201).json(newEnseignant._id);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

//Consulter tous les enseignants
router.get('/', async(req, res) =>{
  try {
    const enseignants = await Enseignant.find();
    res.status(200).json(enseignants);
  }catch{
    res.status(500).json({message:err.message});
  }
});

//Consulter l'enseignant par ID
router.get('/:id', getEnseignant, (req, res) => {
  res.status(200).json(res.enseignant);
});

//Supprimer un enseignant
router.delete('/:id', getEnseignant, async (req, res) => {
  try {
    await res.enseignant.remove()
    res.json({ message: "L'enseignant est supprime" })
    } catch(err) {
    res.status(500).json({ message: err.message })
    }
});

//Middleware
async function getEnseignant(req, res, next) {
  try {
  var enseignant = await Enseignant.findById(req.params.id)
  if (enseignant == null) {
  return res.status(404).json({ message: 'Enseignant introuvable'})
  }
  } catch(err){
  return res.status(500).json({ message: err.message })
  }
  res.enseignant = enseignant
  next()
  }

module.exports = router;
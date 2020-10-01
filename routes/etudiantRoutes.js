var express = require('express');
const etudiant = require('../models/etudiant');
var router = express.Router();
const Etudiant = require('../models/etudiant');

//S'inscrire un etudiant
router.post('/', async (req, res) => {

  const etudiant = new Etudiant({
    prenom: req.body.prenom,
    nom: req.body.nom,
    courriel: req.body.courriel,
    motDePasse: req.body.motDePasse,
    travaux: req.body.travaux
  });

  try {
    const newEtudiant = await etudiant.save()
    res.status(201).json(newEtudiant._id);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

//Consulter tous les etudiants
router.get('/', async(req, res) =>{
  try {
    const etudiants = await Etudiant.find();
    res.status(200).json(etudiants);
  }catch{
    res.status(500).json({message:err.message});
  }
});

//Consulter l'etudiant par ID
router.get('/:id', getEtudiant, (req, res) => {
  res.status(200).json(res.etudiant);
});

//Supprimer un etudiant
router.delete('/:id', getEtudiant, async (req, res) => {
  try {
    await res.etudiant.remove()
    res.json({ message: "L'etudiant est supprime" })
    } catch(err) {
    res.status(500).json({ message: err.message })
    }
});

//Modifier un etudiant(ajouter ou modifier des travaux)
router.patch('/:id', getEtudiant, async (req, res) => {
  if (req.body._id != null) {
  for(t in res.etudiant.travaux){
    
  }
  }
  try {
  const updatedEtudiant = await res.etudiant.save()
  res.status(200).json(updatedEtudiant._id);
  } catch {
  res.status(400).json({ message: err.message })
  }
  });

//Middleware
async function getEtudiant(req, res, next) {
  try {
  var etudiant = await Etudiant.findById(req.params.id)
  if (etudiant == null) {
  return res.status(404).json({ message: 'Etudiant introuvable'})
  }
  } catch(err){
  return res.status(500).json({ message: err.message })
  }
  console.log(etudiant);
  res.etudiant = etudiant;
  next();
  }

module.exports = router;
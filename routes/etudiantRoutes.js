const Joi = require('joi');
var express = require('express');
var router = express.Router();
const Etudiant = require('../models/etudiant');
const Devoir = require('../models/exam');
const mongoose = require('mongoose');

//S'inscrire un etudiant
router.post('/', async (req, res) => {
  const { error } = validateEtudiant(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const etudiant = new Etudiant({
    prenom: req.body.prenom,
    nom: req.body.nom,
    courriel: req.body.courriel,
    motDePasse: req.body.motDePasse,
    // travaux: req.body.travaux
  });

  try {
    const newEtudiant = await etudiant.save()
    res.status(201).json(newEtudiant._id);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

router.post('/login', async (req, res) => {
  let courriel = req.body.courriel;
  let motDePasse = req.body.motDePasse;

  if (courriel && motDePasse) {

    try {

      let etudiant = await Etudiant.findOne({ courriel: courriel, motDePasse: motDePasse });
      if (etudiant) res.status(200).json([etudiant._id]);
      else res.status(400).json({ message: err.message })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
});

//Consulter tous les etudiants
router.get('/', async (req, res) => {
  try {
    const etudiants = await Etudiant.find();
    res.status(200).json(etudiants);
  } catch {
    res.status(500).json({ message: err.message });
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
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

//Consulter les  devoirs de l'etudiant par ID
router.get('/:id/devoir', getEtudiant, (req, res) => {
  res.status(200).json(res.etudiant.travaux);
});

// Assigner un devoir a une etudiant
// Repondre aux question par etudiant
// Modifier les note de devoir par enseignant
router.patch('/:id/devoirs/:idDevoir', getEtudiant, getDevoir, async (req, res) => {

  let devoirExiste = false;

  for (let i = 0; i < res.etudiant.travaux.length; i++) {
    if (res.etudiant.travaux[i]._id == req.params.idDevoir) {
      res.etudiant.travaux.splice(i, 1);
      devoirExiste = true;
    }
  }
  if (!devoirExiste) {
    res.etudiant.travaux.push(res.devoir);
  } else {
    res.etudiant.travaux.push(req.body);
  }
  try {
    const updatedEtudiant = await res.etudiant.save()
    res.status(201).json(updatedEtudiant._id);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

function validateEtudiant(enseignant) {
  const schema = {
    nom: Joi.string().min(3).required(),
    prenom: Joi.string().min(3).required(),
    courriel: Joi.string().required(),
    motDePasse: Joi.string().min(6).required()
  };

  return Joi.validate(enseignant, schema);
}

//Middleware
async function getEtudiant(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).json({ message: 'Id invalide' });

  try {
    var etudiant = await Etudiant.findById(req.params.id)
    if (etudiant == null) {
      return res.status(404).json({ message: 'Etudiant introuvable' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.etudiant = etudiant;
  next();
}

async function getDevoir(req, res, next) {
  try {
    var devoir = await Devoir.findById(req.params.idDevoir);
    if (devoir == null) {
      return res.status(404).json({ message: 'Devoir introuvable' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.devoir = devoir;
  next()
}

module.exports = router;
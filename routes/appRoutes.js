var express = require('express');
var router = express.Router();
const Enseignant = require('../models/enseignant');
const Etudiant = require('../models/etudiant');
const QCM = require('../models/qcm');
const VraiFaux = require('../models/vraiFaux');
const ADevelopper = require('../models/aDevelopper');
const Devoir = require('../models/devoir');

//S'inscrire un enseignant
router.post('/enseignants', async (req, res) => {

  const enseignant = new Enseignant({
    prenom: req.body.prenom,
    nom: req.body.nom,
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

//S'inscrire un etudiant
router.post('/etudiants', async (req, res) => {

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

//Creer une question QCM
router.post('/qcms', async (req, res) => {

  const qcm = new QCM({
    titre: req.body.titre,
    bonReponse: req.body.bonReponse,
    reponse1: req.body.reponse1,
    reponse2: req.body.reponse2,
    reponse3: req.body.reponse3,
    reponse4: req.body.reponse4,
    enseignantID: req.body.enseignantID
  });

  try {
    const newQCM = await qcm.save()
    res.status(201).json(newQCM._id);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

//Creer une question a developper
router.post('/adeveloppers', async (req, res) => {

  const aDevelopper = new Devoir({
    titre: req.body.titre,
    bonReponse: req.body.bonReponse,
    enseignantID: req.body.enseignantID
  });

  try {
    const newADevelopper = await aDevelopper.save()
    res.status(201).json(newADevelopper._id);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

//Creer une question vrai/faux
router.post('/vraifaux', async (req, res) => {

  const vraiFaux = new Devoir({
    titre: req.body.titre,
    bonReponse: req.body.bonReponse,
    enseignantID: req.body.enseignantID
  });

  try {
    const newVraiFaux = await vraiFaux.save()
    res.status(201).json(newVraiFaux._id);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

//Creer un devoir
router.post('/devoirs', async (req, res) => {

  const devoir = new Devoir({
    cours: req.body.cours,
    dateRemise: req.body.dateRemise,
    statut: req.body.statut,
    questions: req.body.questions,
    enseignantID: req.body.enseignantID
  });

  try {
    const newDevoir = await devoir.save()
    res.status(201).json(newDevoir._id);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

//Consulter tous les enseignants
router.get('/enseignants', async(req, res) =>{
  try {
    const enseignants = await Enseignant.find();
    res.status(200).json(enseignants);
  }catch{
    res.status(500).json({message:err.message});
  }
});

//Consulter tous les etudiants
router.get('/etudiants', async(req, res) =>{
  try {
    const etudiants = await Etudiant.find();
    res.status(200).json(etudiants);
  }catch{
    res.status(500).json({message:err.message});
  }
});

//Consulter toutes les QCMs
router.get('/qcms', async(req, res) =>{
  try {
    const qcms = await QCM.find();
    res.status(200).json(qcms);
  }catch{
    res.status(500).json({message:err.message});
  }
});

//Consulter toutes les questions a developper
router.get('/adeveloppers', async(req, res) =>{
  try {
    const aDeveloppers = await ADevelopper.find();
    res.status(200).json(aDeveloppers);
  }catch{
    res.status(500).json({message:err.message});
  }
});

//Consulter toutes les questions a vrai/faux
router.get('/vraifaux', async(req, res) =>{
  try {
    const vraiFaux = await VraiFaux.find();
    res.status(200).json(vraiFaux);
  }catch{
    res.status(500).json({message:err.message});
  }
});

//Consulter tous les devoirs
router.get('/devoirs', async(req, res) =>{
  try {
    const devoirs = await Devoir.find();
    res.status(200).json(devoirs);
  }catch{
    res.status(500).json({message:err.message});
  }
});

module.exports = router;
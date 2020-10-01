var express = require('express');
var router = express.Router();
const Enseignant = require('../models/enseignant');
const QCM = require('../models/qcm');


//Creer une question QCM
router.post('/', async (req, res) => {

  const enseignant = await Enseignant.findById(req.body.enseignantId);
  if (!enseignant) return res.status(400).json({message:err.message});

  const qcm = new QCM({
    titre: req.body.titre,
    bonReponse: req.body.bonReponse,
    reponse1: req.body.reponse1,
    reponse2: req.body.reponse2,
    reponse3: req.body.reponse3,
    reponse4: req.body.reponse4,
    enseignant:{
      _id:enseignant._id
    }
  });

  try {
    const newQCM = await qcm.save()
    res.status(201).json(newQCM._id);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});


//Consulter toutes les QCMs
router.get('/', async(req, res) =>{
  try {
    const qcms = await QCM.find();
    res.status(200).json(qcms);
  }catch{
    res.status(500).json({message:err.message});
  }
});

//Consulter la question par ID
router.get('/:id', getQCM, (req, res) => {
  res.status(200).json(res.qcm);
});

//Supprimer un QCM
router.delete('/:id', getQCM, async (req, res) => {
  try {
    await res.qcm.remove()
    res.json({ message: "La Question est supprime" })
    } catch(err) {
    res.status(500).json({ message: err.message })
    }
});

//Middleware
async function getQCM(req, res, next) {
  try {
  var qcm = await QCM.findById(req.params.id)
  if (qcm == null) {
  return res.status(404).json({ message: 'Question introuvable'})
  }
  } catch(err){
  return res.status(500).json({ message: err.message })
  }
  res.qcm = qcm;
  next();
  }

module.exports = router;
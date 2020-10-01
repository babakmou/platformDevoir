var express = require('express');
var router = express.Router();
const Devoir = require('../models/devoir');
const Enseignant = require('../models/enseignant');
// const QCM = require('../models/qcm');
// const ADevelopper = require('../models/aDevelopper');
// const VraiFaux = require('../models/vraiFaux');


//Creer un devoir
router.post('/', async (req, res) => {

  const enseignant = await Enseignant.findById(req.body.enseignantId);
  if (!enseignant) return res.status(400).json({ message: err.message });

  const devoir = new Devoir({
    dateRemise: req.body.dateRemise,
    // statut: req.body.statut,
    questions: req.body.questions,
    enseignant: req.body.enseignantId
  });

  try {
    const newDevoir = await devoir.save();
    res.status(201).json(newDevoir._id);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

//Consulter tous les devoirs
router.get('/', async (req, res) => {
  try {
    const devoirs = await Devoir.find();
    console.log(devoirs[1].questions[1].question);
    res.status(200).json(devoirs);
  } catch {
    res.status(500).json({ message: err.message });
  }
});

//Consulter le devoir par ID
router.get('/:id', getDevoir, (req, res) => {
  res.status(200).json(res.devoir);
});

//Supprimer un devoir
router.delete('/:id', getDevoir, async (req, res) => {
  try {
    await res.devoir.remove();
    res.json({ message: "Le devoir est supprime" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// //Modifier un devoir(mettre a jour des questions, ajouter la note totale)
// router.patch('/:id', getDevoir, async (req, res) => {
//   if (req.body.travail != null) {
//     res.devoir.travail = req.body.travail;
//   }
//   if (req.body.noteTotale != null) {
//     res.devoir.noteTotale = req.body.noteTotale;
//   }
//   try {
//     const updatedDevoir = await res.devoir.save();
//     res.status(200).json(updatedDevoir._id);
//   } catch {
//     res.status(400).json({ message: err.message });
//   }
// });

//Middleware
async function getDevoir(req, res, next) {
  try {
    devoir = await Devoir.findById(req.params.id);
    if (devoir == null) {
      return res.status(404).json({ message: 'Enseignant introuvable' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.devoir = devoir;
  next()
}

module.exports = router;
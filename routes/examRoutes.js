var express = require('express');
var router = express.Router();
const Exam = require('../models/exam');
const User = require('../models/user');
// const QCM = require('../models/qcm');
// const ADevelopper = require('../models/aDevelopper');
// const VraiFaux = require('../models/vraiFaux');


//Creating an exam
router.post('/', async (req, res) => {

  const user = await User.findById(req.body.teacher);
  if (!user) return res.status(400).json({ 'message': 'Invalid user Id' });

  const exam = new Exam({
    title: req.body.title,
    deadline: req.body.deadline,
    status: req.body.status,
    questions: req.body.questions,
    teacher: user._id
  });

  try {
    const newExam = await exam.save();
    res.status(201).json(newExam._id);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

//Getting all exams
router.get('/', async (req, res) => {
  try {
    const devoirs = await Exam.find();
    res.status(200).json(devoirs);
  } catch {
    res.status(500).json({ message: err.message });
  }
});

//Getting an exam by Id
router.get('/:id', getExam, (req, res) => {
  res.status(200).json(res.exam);
});

//Deleting an exam
router.delete('/:id', getExam, async (req, res) => {
  try {
    await res.exam.remove();
    res.json({ message: 'Exam was deleted.' });
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
async function getExam(req, res, next) {
  try {
    let exam = await Exam.findById(req.params.id);
    if (exam == null) {
      return res.status(404).json({ message: 'Exam not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.exam = exam;
  next()
}

module.exports = router;
var express = require('express');
var router = express.Router();
const User = require('../models/user');
const TrueFalse = require('../models/trueFalse');



//Creer une question vrai/faux
router.post('/', async (req, res) => {

  const user = await User.findById(req.body.teacher);
  if (!user) return res.status(400).json({'message':'Invalid user Id'});

  const trueFalse = new TrueFalse({
    title: req.body.title,
    correctAnswer: req.body.correctAnswer,
    teacher: user._id
  });

  try {
    const newTrueFalse = await trueFalse.save();
    res.status(201).json(newTrueFalse._id);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

//Getting all true false questions
router.get('/', async (req, res) => {
  try {
    const trueFalses = await TrueFalse.find();
    res.status(200).json(trueFalses);
  } catch {
    res.status(500).json({ message: err.message });
  }
});

//Getting a question by ID
router.get('/:id', getTrueFalse, (req, res) => {
  res.status(200).json(res.trueFalse);
});

//Deleting a question
router.delete('/:id', getTrueFalse, async (req, res) => {
  try {
    await res.trueFalse.remove()
    res.json({ message: 'Question was deleted.' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

//Middleware
async function getTrueFalse(req, res, next) {
  try {
    var trueFalse = await TrueFalse.findById(req.params.id)
    if (trueFalse == null) {
      return res.status(404).json({ message: 'Question not found' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.trueFalse = trueFalse;
  next();
}

module.exports = router;
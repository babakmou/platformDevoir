var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Essay = require('../models/essay');


//Creatig an essay question
router.post('/', async (req, res) => {

  const user = await User.findById(req.body.teacher);
  if (!user) return res.status(400).json({ 'message': 'Invalid user Id' });

  const essay = new Essay({
    title: req.body.title,
    teacher: user._id
  });

  try {
    const newEssay = await essay.save()
    res.status(201).json(newEssay._id);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

//Getting all questions
router.get('/', async (req, res) => {
  try {
    const essays = await Essay.find();
    res.status(200).json(essays);
  } catch {
    res.status(500).json({ message: err.message });
  }
});

//Getting a question by ID
router.get('/:id', getEssay, (req, res) => {
  res.status(200).json(res.aDevelopper);
});

//Deleting a question
router.delete('/:id', getEssay, async (req, res) => {
  try {
    await res.essay.remove()
    res.json({ message: 'Question was deleted.' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

//Middleware
async function getEssay(req, res, next) {
  try {
    var essay = await Essay.findById(req.params.id)
    if (essay == null) {
      return res.status(404).json({ message: 'Question not found' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.essay = essay;
  next();
}

module.exports = router;
var express = require('express');
var router = express.Router();
const User = require('../models/user');
const MCQ = require('../models/mcq');


//Creating a multiple choice question
router.post('/', async (req, res) => {

  const user = await User.findById(req.body.teacher);
  if (!user) return res.status(400).json({'message':'Invalid user Id'});

  const mcq = new MCQ({
    title: req.body.title,
    answer1: req.body.answer1,
    answer2: req.body.answer2,
    answer3: req.body.answer3,
    answer4: req.body.answer4,
    correctAnswer: req.body.correctAnswer,
    teacher: user._id
  });

  try {
    const newMCQ = await mcq.save()
    res.status(201).json(newMCQ._id);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});


//Getting all MCQs
router.get('/', async(req, res) =>{
  try {
    const mcqs = await MCQ.find();
    res.status(200).json(mcqs);
  }catch{
    res.status(500).json({message:err.message});
  }
});

//Getting a MCQ by ID
router.get('/:id', getMCQ, (req, res) => {
  res.status(200).json(res.mcq);
});

//Deleting a MCQ
router.delete('/:id', getMCQ, async (req, res) => {
  try {
    await res.mcq.remove()
    res.json({ message: 'Question is deleted.' })
    } catch(err) {
    res.status(500).json({ message: err.message })
    }
});

//Middleware
async function getMCQ(req, res, next) {
  try {
  var mcq = await MCQ.findById(req.params.id)
  if (mcq == null) {
  return res.status(404).json({ message: 'Question not found'})
  }
  } catch(err){
  return res.status(500).json({ message: err.message })
  }
  res.mcq = mcq;
  next();
  }

module.exports = router;
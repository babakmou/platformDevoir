const Joi = require('joi');
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Exam = require('../models/exam');


//Register a user
router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    exams: req.body.exams
  });

  try {
    const newUser = await user.save()
    res.status(201).json(newUser._id);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

// router.post('/login', async (req, res) => {
//   let courriel = req.body.courriel;
//   let motDePasse = req.body.motDePasse;

//   if (courriel && motDePasse) {

//     try {

//       let etudiant = await User.findOne({ courriel: courriel, motDePasse: motDePasse });
//       if (etudiant) res.status(200).json([etudiant._id]);
//       else res.status(400).json({ message: err.message })
//     } catch (err) {
//       res.status(500).json({ message: err.message })
//     }
//   }
// });

//Getting all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch {
    res.status(500).json({ message: err.message });
  }
});

//Getting user by ID
router.get('/:id', getUser, (req, res) => {
  res.status(200).json(res.user);
});

//Deleting a user account
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove()
    res.json({ message: "Account was deleted." })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

//Getting exams of a user by ID
router.get('/:id/exams', getUser, (req, res) => {
  res.status(200).json(res.user.exams);
});

// All of the modifications in exams by students or teachers
router.patch('/:id/exams/:idExam', getUser, async (req, res) => {

  if (res.user.role === 'student') {
    let examExists = false;

    for (let i = 0; i < res.user.exams.length; i++) {
      if (res.user.exams[i]._id == req.params.idExam) {
        res.user.exams.splice(i, 1);
        examExists = true;
      }
    }

    if (!examExists) {
      getExam(req, res);
      res.user.exams.push(res.exam);
    } else {
      res.user.exams.push(req.body);
    }

    try {
      const updatedUser = await res.user.save()
      res.status(201).json(updatedUser._id);
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }
  else return res.status(404).json({ message: 'Invalid user Id' });
});

function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().required().valid('student', 'teacher'),
    exams: Joi.array()
  });

  return schema.validate(user);
}

//Middleware
async function getUser(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).json({ message: 'Invalid Id' });

  try {
    var user = await User.findById(req.params.id)
    if (user == null) {
      return res.status(404).json({ message: 'User not found' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.user = user;
  next();
}

async function getExam(req, res) {
  try {
    var exam = await Exam.findById(req.params.idExam);
    if (exam == null) {
      return res.status(404).json({ message: 'Devoir introuvable' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.exam = exam;
}

module.exports = router;
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
require('../auth/passport.js')(passport)

// Usernames and passwords can't contain dangerous symbols so they aren't escaped
router.post('/login',
  body('name').trim().isLength({ min: 3, max: 15 }).matches(/^[a-zA-Z\d]{3,15}$/),
  body('password').isLength({ min: 8, max: 20 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&\?])[a-zA-Z\d!@#$%^&\?]{8,20}$/),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    try {
      const result = await User.findOne({ name: new RegExp(req.body.name, 'i') });
      if (result) {
        if (await bcrypt.compare(req.body.password, result.password)) {
          const token = await jwt.sign(
            {
              id: result._id,
              name: result.name
            },
            process.env.SECRET,
            {
              expiresIn: '15min'
            });
          res.status(200).json({ success: true, token });
        }
        else {
          res.status(403).json({ success: false, error: "Invalid credentials" });
        }
      }
      else {
        res.status(400).send({ success: false, error: "Invalid credentials" });
      }
    }
    catch (e) {
      res.status(404).send({ success: false, error: "Something went wrong" });
    }
  });

router.post('/register',
  body('name').trim().isLength({ min: 3, max: 15 }).matches(/^[a-zA-Z\d]{3,15}$/),
  body('password').isLength({ min: 8, max: 20 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&\?])[a-zA-Z\d!@#$%^&\?]{8,20}$/),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    try {
      const result = await User.findOne({ name: new RegExp(req.body.name, 'i') });
      if (!result) {
        const hash = await bcrypt.hash(req.body.password, 10);
        await new User({
          name: req.body.name,
          password: hash,
        }).save();
        res.status(200).json({ success: true, message: "User added!" });
      }
      else {
        res.status(403).json({ success: false, error: "User already exists" });
      }
    }
    catch (e) {
      console.log(e);
      res.status(404).send({ success: false, error: "Something went wrong!" });
    }
  });

router.get('/getuser', async (req, res) => {
  const nameFilter = req.query.params.name;
  console.log(params);
});

// Returns a user object without password on success, otherwise returns a 401 status
router.get('/authenticate', passport.authenticate('jwt', { session: false }), async (req, res) => {
  res.status(200).send(req.user);
});

  module.exports = router;
const express = require('express')
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const JWT_SECRET = 'MYNAMEISSHUBHAM'

//1 - create usser using: POST "/api/auth/createuser", doesn't need login
router.post('/createuser', [
  //here we are doing validation 
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),

], async (req, res) => {
  const errors = validationResult(req);
  // if there are error, return bad reques and return error
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    //checking user exist with email or not 
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({ error: "Sorry a user with this email alreadt exists" })
    }

    // here we are using hasing and salt technique for better password
    const salt = await bcrypt.genSalt(10)
    secPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })
    const data = {
      user: {
        id: user.id
      }
    }

    // initialising auth token for varifiying user

    const auth_token = jwt.sign(data, JWT_SECRET)
    // res.json(user)
    res.json({auth_token:auth_token})
  }
  catch (error) {
    res.status(500).json({ error: 'internal server error' })
  }

  //   .then(user => res.json(user))
  //   .catch(err=> {console.log(err)
  // res.json({error: 'Please enter a unique value for email', message: err.message})})
})



//2 - Authenticate usser using: POST "/api/auth/login", doesn't need login.

router.post('/login', [ 
  body('email', 'Enter a valid email').isEmail(), 
  body('password', 'Password cannot be blank').exists(), 
], async (req, res) => {

  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
// here we are doing dstructring means taking login and pass from body
  const {email, password} = req.body;
  try {
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({error: "Please try to login with correct credentials"});
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      return res.status(400).json({error: "Please try to login with correct credentials"});
    }

    const data = {
      user:{
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({authtoken})

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }


})

module.exports = router
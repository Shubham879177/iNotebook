const express = require('express')
const router = express.Router()
const User =  require("../models/User")
const { body, validationResult } = require('express-validator');


// create usser using: POST "/api/auth/createuser", doesn't need login
router.post('/createuser',[
    //here we are doing validation 
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),

] , async(req, res)=>{ 
    const errors = validationResult(req);
    // if there are error, return bad reques and return error
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await User.findOne({email:req.body.email})
    if (user){
        return res.status(400).json({error:"Sorry a user with this email alreadt exists"})
    }
    user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      })
      res.json(user)
      
    //   .then(user => res.json(user))
    //   .catch(err=> {console.log(err)
    // res.json({error: 'Please enter a unique value for email', message: err.message})})
})

module.exports = router
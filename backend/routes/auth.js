const express = require('express')
const router = express.Router()
const User =  require("../models/User")


// create usser using: POST "/api/auth/", doesn't need auth
router.post('/',(req,res)=>{
    console.log(req.body)
    const user = User(req.body)
    user.save()
    res.json(req.body)
})



module.exports = router
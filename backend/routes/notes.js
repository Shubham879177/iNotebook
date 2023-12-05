const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    a = req.body
    console.log(a)
    res.send(a)
})



module.exports = router
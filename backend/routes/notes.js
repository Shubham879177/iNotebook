const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Notes using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 2: Create the Notes using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    //here we are doing validation 
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 10 })
], async (req, res) => {

    const{title, description, tag}= req.body
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
         //checking Note exist with same title or not 
        let note = await Note.findOne({title:req.body.title})
        if(note){
            return res.status(400).json({ error: "Sorry a Note with this title already exists" })
        }
        // adding notes
        const notes = new Note({
            title, description,tag, user:req.user.id
        })
       const savednote = await notes.save()
       res.json(savednote)

    // ANOTHER METHOD TO ADD NOTES
        // notes =  await Note.create({
        //     title:req.body.title,
        //     description:req.body.description,
        //     tag:req.body.tag,
        //     user:req.user.id
        // })
        // res.json(notes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})




module.exports = router
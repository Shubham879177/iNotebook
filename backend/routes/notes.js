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

    const { title, description, tag } = req.body

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        //checking Note exist with same title or not 
        let note = await Note.findOne({ title: req.body.title })
        if (note) {
            return res.status(400).json({ error: "Sorry a Note with this title already exists" })
        }
        // adding notes
        const notes = new Note({
            title, description, tag, user: req.user.id
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

// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    // Create a newNote object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found") }

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note });

})

// ROUTE 4: Delete an existing Note using: Delete "/api/notes/delete". Login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {


    // Find the note to be Deleted and delete it
    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found") }

    // checking the user is owner of that note and allow to delete it
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success":"The Note has been deleted", note:note });

})

module.exports = router
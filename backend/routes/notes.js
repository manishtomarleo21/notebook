const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');

//Route 1: Get all notes: GET '/api/notes/fetchallnotes'. Login required!
//here fetchuser is middleware which we import from other file
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error occured')
    }

})

//Route 2: Add notes: POST '/api/notes/addnotes'. Login required!
router.post('/addnotes', fetchuser, [
    body('title', 'Enter a valid title.').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters.').isLength({ min: 5 })
], async (req, res) => {
    //If there are errors in validations send bad request
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save();

        res.json(saveNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error occured')
    }
})

module.exports = router
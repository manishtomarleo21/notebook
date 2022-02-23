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

//Route 3: Update the existing note: PUT '/api/notes/updatenotes'. Login required!
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;
    try {
    //Create a newNote object
    const newNote = {}
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    //find the note to be updated and update
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json(note)
} catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error occured')
}
})

//Route 4: Delete the existing note: DELETE '/api/notes/deletenote'. Login required!
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {    
    //find the note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    //Allow deletion only if user owns this note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note has been deleted", note:note})
} catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error occured')
}
})


module.exports = router
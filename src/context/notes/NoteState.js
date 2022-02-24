import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props)=>{

    let notesInitials = [
        {
          "_id": "62166bd051246a46sd9e486a24",
          "user": "621666269386efdd27f0c4e8",
          "title": "New test",
          "description": "checking by both new Notes file",
          "tag": "General",
          "date": "2022-02-23T17:16:00.444Z",
          "__v": 0
        },
        {
          "_id": "62168a65a115db6wyadaabeebd",
          "user": "621666269386efdd27f0c4e8",
          "title": "Concurrently",
          "description": "Both npm run and nodemon workin 2gether",
          "tag": "npm runners",
          "date": "2022-02-23T19:26:29.129Z",
          "__v": 0
        },
        {
          "_id": "62168a65ahtyd115db6adaabeebd",
          "user": "621666269386efdd27f0c4e8",
          "title": "Concurrently",
          "description": "Both npm run and nodemon workin 2gether",
          "tag": "npm runners",
          "date": "2022-02-23T19:26:29.129Z",
          "__v": 0
        },
        {
          "_id": "62168a65a1shty15db6adaabeebd",
          "user": "621666269386efdd27f0c4e8",
          "title": "Concurrently",
          "description": "Both npm run and nodemon workin 2gether",
          "tag": "npm runners",
          "date": "2022-02-23T19:26:29.129Z",
          "__v": 0
        },
        {
          "_id": "62168a65a1a15dnvbnb456adaabeebd",
          "user": "621666269386efdd27f0c4e8",
          "title": "Concurrently",
          "description": "Both npm run and nodemon workin 2gether",
          "tag": "npm runners",
          "date": "2022-02-23T19:26:29.129Z",
          "__v": 0
        }
      ]

    const [notes, setNotes] = useState(notesInitials)

      //Addnote
      const addNote = (title, description, tag)=>{
        //TODO: Api call
        let note = {
            "_id": "62168a65a1a15dn5vbnb456adaabeebd",
            "user": "621666269386efdd27f0c4e8",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-02-23T19:26:29.129Z",
            "__v": 0
          };
        setNotes(notes.concat(note))
      }

      //deleteNote
      const deleteNote = (id)=>{
          //TODO: Api call
        console.log("Deleting the note with" + id);
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
      }

      //editNote
      const editNote = (id, title, description, tag)=>{

      }





    return(
        <NoteContext.Provider value={{notes, setNotes, addNote, editNote, deleteNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props)=>{

    let notesInitials = [
        {
          "_id": "62166bd051246a469e486a24",
          "user": "621666269386efdd27f0c4e8",
          "title": "New test",
          "description": "checking by both new Notes file",
          "tag": "General",
          "date": "2022-02-23T17:16:00.444Z",
          "__v": 0
        },
        {
          "_id": "62168a65a115db6adaabeebd",
          "user": "621666269386efdd27f0c4e8",
          "title": "Concurrently",
          "description": "Both npm run and nodemon workin 2gether",
          "tag": "npm runners",
          "date": "2022-02-23T19:26:29.129Z",
          "__v": 0
        },
        {
          "_id": "62168a65a115db6adaabeebd",
          "user": "621666269386efdd27f0c4e8",
          "title": "Concurrently",
          "description": "Both npm run and nodemon workin 2gether",
          "tag": "npm runners",
          "date": "2022-02-23T19:26:29.129Z",
          "__v": 0
        },
        {
          "_id": "62168a65a115db6adaabeebd",
          "user": "621666269386efdd27f0c4e8",
          "title": "Concurrently",
          "description": "Both npm run and nodemon workin 2gether",
          "tag": "npm runners",
          "date": "2022-02-23T19:26:29.129Z",
          "__v": 0
        },
        {
          "_id": "62168a65a115db6adaabeebd",
          "user": "621666269386efdd27f0c4e8",
          "title": "Concurrently",
          "description": "Both npm run and nodemon workin 2gether",
          "tag": "npm runners",
          "date": "2022-02-23T19:26:29.129Z",
          "__v": 0
        }
      ]

    const [notes, setNotes] = useState(notesInitials)
    return(
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
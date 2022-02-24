import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const local = "http://localhost:5000"
    let notesInitials = [];

    const [notes, setNotes] = useState(notesInitials)

      //Get all notes
      const getAllNotes = async ()=>{
        //TODO: Api call
        const response = await fetch(`${local}/api/notes/fetchallnotes`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.            
            headers: {
                'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxNjY2MjY5Mzg2ZWZkZDI3ZjBjNGU4In0sImlhdCI6MTY0NTcyOTY4MX0.ofRnV1So-dZ9MS_57dO-x2D3rl5X-FUdnkiJWNb7gZ4', 
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
          const json = await response.json();
             //   console.log(json);
             setNotes(json)
      }
      const addNote = async (title, description, tag)=>{
        //TODO: Api call
        const response = await fetch(`${local}/api/notes/addnotes`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.            
            headers: {
                'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxNjY2MjY5Mzg2ZWZkZDI3ZjBjNGU4In0sImlhdCI6MTY0NTcyOTY4MX0.ofRnV1So-dZ9MS_57dO-x2D3rl5X-FUdnkiJWNb7gZ4', 
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
           
            body: JSON.stringify({title, description, tag})//an object like title:title // body data type must match "Content-Type" header
          });
          


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
      const editNote = async (id, title, description, tag)=>{
          //APi call
          const response = await fetch(`${local}/api/notes/updatenotes/${id}`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.            
            headers: {
                'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxNjY2MjY5Mzg2ZWZkZDI3ZjBjNGU4In0sImlhdCI6MTY0NTcyOTY4MX0.ofRnV1So-dZ9MS_57dO-x2D3rl5X-FUdnkiJWNb7gZ4', 
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
           
            body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
          });
          const json =  response.json(); // parses JSON response into native JavaScript objects
      
          //Logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;

            }
            
        }
      }





    return(
        <NoteContext.Provider value={{notes, setNotes, addNote, editNote, deleteNote, getAllNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
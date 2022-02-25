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
              'auth-token': localStorage.getItem('token'),
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
              'auth-token': localStorage.getItem('token'),
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
           
            body: JSON.stringify({title, description, tag})//an object like title:title // body data type must match "Content-Type" header
          });
          

        const note = await response.json();
        setNotes(notes.concat(note))
        
      }

      //deleteNote
      const deleteNote = async (id)=>{
          //TODO: Api call
          const response = await fetch(`${local}/api/notes/deletenote/${id}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.            
            headers: {
              'auth-token': localStorage.getItem('token'),
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            }
          });
          const json =  response.json();
          console.log(json);
        console.log("Deleting the note with" + id);
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
      }

      //editNote
      const editNote = async (id, title, description, tag)=>{
          //APi call
          const response = await fetch(`${local}/api/notes/updatenotes/${id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.            
            headers: {
              'auth-token': localStorage.getItem('token'),
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
           
            body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
          });
          const json =  response.json(); // parses JSON response into native JavaScript objects
      
          let newNotes = JSON.parse(JSON.stringify(notes))

          //Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            let element = newNotes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
                break
            }
          }
          setNotes(newNotes)
      }





    return(
        <NoteContext.Provider value={{notes, setNotes, addNote, editNote, deleteNote, getAllNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
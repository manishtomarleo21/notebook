import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const {addNote } = context;
    const {showAlert} = props;

    const [note, setNote] = useState({title:"", description:"", tag:""})

    const handleClick = (e)=>{
        e.preventDefault() 
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description:"", tag:""})
        props.showAlert("success", "Note is saved successfully.")
    }

    const onChange = (e)=>{
        //this will target input element name and update the valus of input as we type check on console react
        setNote({...note, [e.target.name]:e.target.value})
    }


  return (
    <div className="container my-3">
        <h1>Add a Note</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange}  minLength={5} required />
            
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description"value={note.description}  onChange={onChange}  minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={3}/>
          </div>
          
          <button type="submit" disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary"onClick={handleClick}>Add Note</button>
        </form>
      </div>
  )
}

export default AddNote
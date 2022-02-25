import React, { useContext, useState, useEffect, useRef  } from 'react'
import NoteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
    const context = useContext(NoteContext);
    const { notes, addNote, getAllNotes, editNote } = context;
    const [note, setNote] = useState({id:"", etitle:"", edescription:"", etag:"default"})
    const ref = useRef(null)
    const refClose = useRef(null)
    const {showAlert} = props;
    const navigate = useNavigate();


    useEffect(() => {
        if(localStorage.getItem('toke')){
            getAllNotes()
        }
        else{
            navigate('/login')
        }

    }, [])

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag})
       

    }
    

    const handleClick = (e)=>{
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
        props.showAlert('success', "File Updated successfully")
        
        
    }

    const onChange = (e)=>{
        //this will target input element name and update the valus of input as we type check on console react
        setNote({...note, [e.target.name]:e.target.value})
    }

    return (
        <>
            <AddNote showAlert={showAlert} />

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" value={note.etitle} id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} minLength={5} required />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" value={note.edescription} id="edescription" name="edescription" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" value={note.etag} id="etag" name="etag" onChange={onChange} minLength={3} />
                                </div>


                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button"  disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <div className='container mx-2' >
                <h2>Your Notes</h2>
                {notes.length===0 && <strong>No Notes TO Display</strong>}
                </div>
                {notes.map((note) => {
                    return <NoteItem showAlert={showAlert} key={note._id} updateNote={updateNote} note={note} />

                })}
            </div>
        </>
    )
}

export default Notes
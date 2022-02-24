import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const {deleteNote, editNote } = context;
    const { note } = props;
    return (
        <div className='col-md-3'>
            
            <div className="card" >
                <div className="card-body my-3">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="far fa-trash-alt mx-3" onClick={()=>{deleteNote(note._id)}} ></i>
                    <i className="far fa-edit mx-2" onClick={()=>{editNote(note._id)}} ></i>
                </div>
            </div>
        </div>

    )
}

export default NoteItem
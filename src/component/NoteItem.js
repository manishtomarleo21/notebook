import React from 'react'

const NoteItem = (props) => {
    const { note } = props;
    return (
        <div className='col-md-3'>
            
            <div className="card" >
                <div className="card-body my-3">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <a href="/" className="btn btn-primary">Delete</a>
                </div>
            </div>
        </div>

    )
}

export default NoteItem
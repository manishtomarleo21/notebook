import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props)=>{

    const state = {
        "name":"Manish",
        "job":"developer"
    }
    const [newstate, setState] = useState(state)
    const update = ()=>{
        setTimeout(() => {
            setState({
                "name":"harish",
                "job":"kachra seth"
            })
        }, 1000);
    }
    return(
        <NoteContext.Provider value={{newstate, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
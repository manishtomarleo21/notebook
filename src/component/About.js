import React, {useContext} from 'react'
import NoteContext from '../context/notes/NoteContext'
import { useEffect } from 'react'

const About = () => {
  let a = useContext(NoteContext)
  useEffect(() => {
    a.update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    
  }, [])
  
  return (
    <div>About {a.newstate.name} in class {a.newstate.job}</div>
  )
}

export default About
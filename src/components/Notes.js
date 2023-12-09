import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem'
const Notes = () => {
    
  // useContext is used for use the context api 
  const context = useContext(noteContext)
  // here we are dstructuing the notes and setnotes from context 
  const{notes,setNotes} = context

  return (
    <div className="row my-2">
    <h1 >Your Notes</h1>
    {notes.map((note)=>{
      return <Noteitem note={note}/>
    })}
  </div>
  )
}

export default Notes
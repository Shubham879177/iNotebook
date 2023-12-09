import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem'
import AddNote from './AddNote'
const Notes = () => {

  // useContext is used for use the context api 
  const context = useContext(noteContext)
  // here we are dstructuing the notes and setnotes from context 
  const { notes, addNote } = context

  return (
    <>
      <AddNote />
      <div className="row my-2">
        <h1 >Your Notes</h1>

        {/* here notes is come from notestate file  */}
        {notes.map((note) => {
          return <Noteitem key={note.id} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes
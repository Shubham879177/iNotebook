import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = () => {
    
  // useContext is used for use the context api 
  const context = useContext(noteContext)
  // here we are dstructuing the notes and setnotes from context 
  const {addNote } = context

  const [note, setNote] = useState({title:"", description:"",tag:"default"})

  const handelClick=(e)=>{
    // this is used to stop the page to reload after submiting
      e.preventDefault()
      addNote(note.title, note.description, note.tag)
  }

  const onchange=(e)=>{
    // here ...note mtlb ki note to rhe sath me or bi add ho jayen
    setNote({...note, [e.target.name]:e.target.value})
  }

  return (
    <div className='container'>
        <div className="container my-3">
        <h1>Add Notes</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' onChange={onchange} aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name='description' onChange={onchange} aria-describedby="emailHelp" />
          </div>
          {/* <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" onChange={onchange} id="tag" name='tag' />
          </div> */}
          
          <button type="submit" className="btn btn-primary" onClick={handelClick}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
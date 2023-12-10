import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = () => {
    
  // useContext is used for use the context api 
  const context = useContext(noteContext);
  const {addNote} = context;

  const [note, setNote] = useState({title: "", description: "", tag: "default"})


  const handleClick = (e)=>{
    // this is used to stop the page to reload after submiting
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
}



  const onChange = (e)=>{
    // here ...note mtlb ki note to rhe sath me or bi add ho jayen
    setNote({...note, [e.target.name]: e.target.value})
}

  return (
    <div className='container'>
        <div className="container my-3">
        <h1>Add Notes</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' onChange={onChange} aria-describedby="emailHelp" />
            <small>Enter a valid Title of atleast length of 5</small>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name='description' onChange={onChange} aria-describedby="emailHelp" />
          <small>Enter a valid Description of atleast length of 10</small>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" onChange={onChange} id="tag" name='tag' />
            <small>Enter a Valid Tag name atleast minimum length 3</small>
          </div>
          
          <button type="submit" className="btn btn-outline-primary" onClick={handleClick}>Add Note</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
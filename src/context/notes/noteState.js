import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  // Get all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3MTJlYTk2ZTE0YzVmNDU5ZDc5ODcyIn0sImlhdCI6MTcwMTkxOTM0M30.1AijPquI9eDYkChQPO5YxrQnuGPkQ5Jupgh0eEvefXY"
      }
    });
    const json = await response.json()
    setNotes(json)
  }

// Add a Note
const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3MTJlYTk2ZTE0YzVmNDU5ZDc5ODcyIn0sImlhdCI6MTcwMTkxOTM0M30.1AijPquI9eDYkChQPO5YxrQnuGPkQ5Jupgh0eEvefXY",
        "Content-Type": "application/json"
   },
      body: JSON.stringify({title, description, tag})
    });
    const note = {
      "title":title,
      "description":description,
      "tag":tag
    };
    setNotes(notes.concat(note))}

  // Delete a Note
  const deleteNote = async(id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
            "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3MTJlYTk2ZTE0YzVmNDU5ZDc5ODcyIn0sImlhdCI6MTcwMTkxOTM0M30.1AijPquI9eDYkChQPO5YxrQnuGPkQ5Jupgh0eEvefXY",
            "Content-Type": "application/json"    },
      });
      const json = response.json()
    console.log(json);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }



  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3MTJlYTk2ZTE0YzVmNDU5ZDc5ODcyIn0sImlhdCI6MTcwMTkxOTM0M30.1AijPquI9eDYkChQPO5YxrQnuGPkQ5Jupgh0eEvefXY"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = response.json();

    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }

    }
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;

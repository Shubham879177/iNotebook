import React, { useState } from 'react'
import NoteContext from './noteContext'


const NoteState = (props) => {
    const initailnotes =
        [
            {
                "_id": "65713c09af7fd60cbcbeed2f1",
                "user": "65712ea96e14c5f459d79872",
                "title": "My title",
                "description": "My title is bes title3",
                "tag": "News24",
                "date": "2023-12-07T03:29:13.268Z",
                "__v": 0
            },
            {
                "_id": "65713c941209198f525c416hkhbhj6",
                "user": "65712ea96e14c5f459d79872",
                "title": "My title2",
                "description": "My title is bes title3",
                "tag": "News24",
                "date": "2023-12-07T03:31:32.562Z",
                "__v": 0
            },
        ]
    const [notes, setNotes] = useState(initailnotes)

        // Add a notes
        const addNote=(title, description, tag)=>{
            console.log("adding a note")
            const note={
                "_id": "65713c941209198f525c41662",
                "user": "65712ea96e14c5f459d79872",
                "title": title,
                "description": description,
                "tag": "News24",
                "date": "2023-12-07T03:31:32.562Z",
                "__v": 0
            }
            setNotes(notes.concat(note))
        }

        // Delete a note 
        const deleteNote = ()=>{}

        // edit a note 
        const editNote=()=>{}




    return (
        <NoteContext.Provider value={{notes,addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState
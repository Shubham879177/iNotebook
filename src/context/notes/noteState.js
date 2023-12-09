import React, { useState } from 'react'
import NoteContext from './noteContext'


const NoteState = (props) => {
    const initailnotes =
        [
            {
                "_id": "65713c09af7fd60cbcbeed2f",
                "user": "65712ea96e14c5f459d79872",
                "title": "My title",
                "description": "My title is bes title3",
                "tag": "News24",
                "date": "2023-12-07T03:29:13.268Z",
                "__v": 0
            },
            {
                "_id": "65713c941209198f525c4166",
                "user": "65712ea96e14c5f459d79872",
                "title": "My title2",
                "description": "My title is bes title3",
                "tag": "News24",
                "date": "2023-12-07T03:31:32.562Z",
                "__v": 0
            },
            {
                "_id": "65713c941209198f525c4166",
                "user": "65712ea96e14c5f459d79872",
                "title": "My title2",
                "description": "My title is bes title3",
                "tag": "News24",
                "date": "2023-12-07T03:31:32.562Z",
                "__v": 0
            }
        ]

    const [notes, setNotes] = useState(initailnotes)

    return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState
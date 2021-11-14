import NoteContext from "./noteContext";
import { useState } from "react";

const NotesState = (props)=>{
    const notesInitial = [
        {
          "_id": "618e197e249af6906d6a80ee",
          "user": "618ce58b2502523ad688d026",
          "title": "Dummy Note",
          "description": "This is a dummy note",
          "tag": "test-tag",
          "date": "2021-11-12T07:36:30.555Z",
          "__v": 0
        },
        {
          "_id": "618e1991249af6906d6a80f0",
          "user": "618ce58b2502523ad688d026",
          "title": "Dummy Note",
          "description": "This is a dummy note",
          "tag": "test-tag",
          "date": "2021-11-12T07:36:49.891Z",
          "__v": 0
        },
        {
          "_id": "618e1992249af6906d6a80f2",
          "user": "618ce58b2502523ad688d026",
          "title": "Dummy Note",
          "description": "This is a dummy note",
          "tag": "test-tag",
          "date": "2021-11-12T07:36:50.360Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial);

    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NotesState;
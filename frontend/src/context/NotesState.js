import NoteContext from "./noteContext";
import { useState } from "react";

const NotesState = (props) => {
  const hostName = "http://localhost:5000";
  const [notes, setNotes] = useState([]);

  const getAllNotes = async () => {
      const response = await fetch(`${hostName}/api/note/fetchAllNotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE4Y2U1OGIyNTAyNTIzYWQ2ODhkMDI2In0sImlhdCI6MTYzNjc4NTMxN30.cKB_Sj4SCIq-hMH9QYS3IoK8urmRaVT_1Xih5POwzA4"
        }
      });
      const data = await response.json();
      setNotes(data);
  };

  // add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${hostName}/api/note/addNote`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE4Y2U1OGIyNTAyNTIzYWQ2ODhkMDI2In0sImlhdCI6MTYzNjc4NTMxN30.cKB_Sj4SCIq-hMH9QYS3IoK8urmRaVT_1Xih5POwzA4"
      },
      body: JSON.stringify({title, description, tag})
    });
    // const data = await response.json(); 
    const newNote = {
      _id: "618e1992249af6906d6a80f1",
      user: "618ce58b2502523ad688d026",
      title: title,
      description: description,  
      tag: tag,
      date: "2021-11-12T07:36:30.555Z",
      __v: 0,
    };
    setNotes(notes.concat(newNote));
  };

  // edit a note
  const editNote = async (noteId, title, description, tag) => {
      const response = await fetch(`${hostName}/api/note/updateNote/${noteId}`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE4Y2U1OGIyNTAyNTIzYWQ2ODhkMDI2In0sImlhdCI6MTYzNjYyNTYzMn0._R5a4pDV-2FBYrW7itikR3Qkj1SaDcyKYT_GdXZQpBk"
        },
        body: JSON.stringify({title, description, tag})
      });
      // const data = await response.json(); 
      for (let i = 0; i < notes.length; i++) {
        const element = notes[i];
        if(element._id === noteId){
          element.title = title;
          element.description = description;
          element.tag = tag;
        }
      }

  };

  // delete a note
  const deleteNote = async (noteId) => {
    const finalNotesList = notes.filter((note) => {
      return note._id !== noteId
    });
    setNotes(finalNotesList);
    const response = await fetch(`${hostName}/api/note/deleteNote/${noteId}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE4Y2U1OGIyNTAyNTIzYWQ2ODhkMDI2In0sImlhdCI6MTYzNjc4NTMxN30.cKB_Sj4SCIq-hMH9QYS3IoK8urmRaVT_1Xih5POwzA4"
      }
    });
    console.log("deletEd Note " + noteId);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NotesState;

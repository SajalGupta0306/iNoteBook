import NoteContext from "./noteContext";
import { useState } from "react";

const NotesState = (props) => {
  const initialNotes = [
    {
      _id: "618e197e249af6906d6a80ee",
      user: "618ce58b2502523ad688d026",
      title: "Dummy Note 1",
      description: "This is a dummy note",
      tag: "test-tag",
      date: "2021-11-12T07:36:30.555Z",
      __v: 0,
    },
    {
      _id: "618e197e249af6906d6a80ef",
      user: "618ce58b2502523ad688d026",
      title: "Dummy Note 2",
      description: "This is a dummy note",
      tag: "test-tag",
      date: "2021-11-12T07:36:30.555Z",
      __v: 0,
    },
    {
      _id: "618e197e249af6906d6a80eg",
      user: "618ce58b2502523ad688d026",
      title: "Dummy Note 3",
      description: "This is a dummy note",
      tag: "test-tag",
      date: "2021-11-12T07:36:30.555Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(initialNotes);

  // add a note
  const addNote = (title, description, tag) => {
    const newNote = {
      _id: "098765432"+1,
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
  const editNote = (noteId) => {};

  // delete a note
  const deleteNote = (noteId) => {
    console.log("deleting Note " + noteId);
    const finalNotesList = notes.filter((note) => {
      return note._id !== noteId
    });
    setNotes(finalNotesList);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NotesState;

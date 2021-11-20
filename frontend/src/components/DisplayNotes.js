import React, { useContext, useEffect} from "react";
import NoteContext from "../context/noteContext";
import NotesItem from "./NotesItem";

export default function Notes() {
  const context = useContext(NoteContext);
  const { notes, getAllNotes } = context;
  useEffect(() => {
    getAllNotes();
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="row my-5">
      <h2>Your Notes</h2>
      {notes.map((note) => {
        return <NotesItem key={note._id} note={note}></NotesItem>;
      })}
    </div>
  );
}

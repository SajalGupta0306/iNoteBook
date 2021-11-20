import React, { useContext} from "react";
import NoteContext from "../context/noteContext";

export default function NotesItem(props) {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const {note } = props;
  
  return (
    <div className="col-md-3">
      <div className="card my-2">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="fas fa-pen-square"></i>
          <i className="fas fa-trash mx-2" onClick={() => {deleteNote(note._id)}}></i>
        </div>
      </div>
    </div>
  );
}

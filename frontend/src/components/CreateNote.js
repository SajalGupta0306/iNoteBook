import React, { useContext, useState} from "react";
import NoteContext from "../context/noteContext";

export default function CreateNote() {
  const context = useContext(NoteContext);
  const { addNote } = context;
//   useEffect(() => {
//     if(document.getElementById("title").value==="" && document.getElementById("description").value===""){
//         document.getElementById("submit").disabled = true;
//       }else{
//         document.getElementById("submit").disabled = false;
//       }
//   }, []);

  const emptyNote = {
    title: "",
    description: "",
    tag: "default",
  };
  const [note, setNote] = useState(emptyNote);

  const onChange = (e) => {
    //   if(document.getElementById("title").value==="" || document.getElementById("description").value===""){
    //     document.getElementById("submit").disabled = true;
    //   }else{
        setNote({ ...note, [e.target.name]: e.target.value });
    //     document.getElementById("submit").disabled = false;
    //   }
  };

  const addNewNote = (e) => {
    // this doesnt reloads the page when button type is submit
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  };

  return (
    <div className="container my-3">
      <h1>Add a Note</h1>
      <form className="mb-3">
        <div className="mb-3">
          <label htmlFor="title" className ="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="description">Description</label>
          <textarea className="form-control" rows="5" id="description" name="description" onChange={onChange}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className ="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" onChange={onChange}/>
        </div>
        <button type="submit" id="submit" className="btn btn-dark" onClick={addNewNote}>Save</button>
      </form>
    </div>
  );
}

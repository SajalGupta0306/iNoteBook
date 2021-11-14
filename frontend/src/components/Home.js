import React from "react";
import Notes from "./Notes";

export default function Home() {
  return (
    <>
      <div className="container my-3">
        <h1>Add a Note</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          </div>
          <div className="form-floating my-2">
            <textarea className="form-control"  id="floatingTextarea2" style={{"height": "100px"}}></textarea>
            <label htmlFor="floatingTextarea2">Description</label>
          </div>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
      <Notes/>
    </>
  );
}

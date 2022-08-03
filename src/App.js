import React, { useState } from "react";
import Nav from "./component/Nav";
import Note from "./component/Note";
import DisNotes from "./component/DisNotes";
import { Routes, Route, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
export default function App() {
  const [notes, setnotes] = useState(getNotes);
  localStorage.setItem("notes", JSON.stringify(notes));
  return (
    <>
      <Nav />

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Note notes={notes} setnotes={setnotes} />}
          />
          <Route
            path="edit/:id"
            element={<Note notes={notes} setnotes={setnotes} />}
          />
        </Routes>

        <div className="container">
          <div className="row justify-contain-center">
            <div className="col-md-10">
              <h1 className="mb-3"> Notes </h1>{" "}
              {notes.length === 0 ? (
                <div className="card-body">
                  <h5 className="card-title"> Message </h5>{" "}
                  <p className="card-text"> Please add some of your notes </p>
                </div>
              ) : (
                notes.map((element) => {
                  return (
                    <DisNotes
                      element={element}
                      key={element.id}
                      notes={notes}
                      setnotes={setnotes}
                    />
                  );
                })
              )}
            </div>{" "}
          </div>{" "}
        </div>
      </BrowserRouter>
    </>
  );

  function getNotes() {
    const note = JSON.parse(localStorage.getItem("notes"));
    if (note) {
      return note;
    } else {
      return [];
    }
  }
}

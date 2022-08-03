import React from "react";
import { Link, useNavigate } from "react-router-dom";
export default function DisNotes({ element, notes, setnotes }) {
  console.log(element);
  const navigate = useNavigate();
  const removeHandler = (id) => {
    const newNotes = notes.filter((elm) => {
      if (elm.id !== id) {
        return elm;
      }
    });
    setnotes(newNotes);
    navigate("/");
  };
  return (
    <>
      <div className="card">
        <div className="card-body text-captialiaze">
          <h5 className="card-title">{element.title}</h5>
          <p className="card-text">{element.desc}</p>
          <Link to={`edit/${element.id}`}>
            <button className="btn btn-primary">Edit</button>
          </Link>
          <button
            className="btn btn-danger mx-2"
            onClick={() => {
              removeHandler(element.id);
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </>
  );
}

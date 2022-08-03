import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Note({ notes, setnotes }) {
  const [title, settitle] = useState("");
  const [desc, setDesc] = useState("");
  let { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      let tempData = notes.filter((e) => e.id == id)[0];
      // console.log(tempData)
      settitle(tempData.title);
      setDesc(tempData.desc);
    }
  }, [id]);
  const titleInputHandler = (e) => {
    settitle(e.target.value);
  };
  const descInputHandler = (e) => {
    setDesc(e.target.value);
  };
  const addNotesHandler = (e) => {
    e.preventDefault();
    let tempData = notes.find((e) => {
      return e.title == title;
    });
    console.log(title, desc, tempData);
    if (title == "" || desc == "" || tempData) {
      alert("Please Enter value or checking for the duplicate title not allowed");
      return;
    } else {
      setnotes((notes) => {
        return [
          ...notes,
          {
            title: title,
            desc: desc,
            id: new Date().getTime(),
          },
        ];
      });
      settitle("");
      setDesc("");
      navigate("/");
    }
  };
  const editNotesHandler = (e) => {
    e.preventDefault();
    let tempData = notes.find((e) => {
      if (e.title == title && e.id != id) return e;
    });
    if (title == "" || desc == "" || tempData) {
      alert("Please Enter value or checking for the duplicate title not allowed");
      return;
    } else {
      setnotes((notes) => {
        return [
          ...notes.map((e) =>
            e.id == id
              ? {
                  title: title,
                  desc: desc,
                  id: new Date().getTime(),
                }
              : e
          ),
        ];
      });
      settitle("");
      setDesc("");
      navigate("/");
    }
  };
  return (
    <>
      <div className="container">
        <div
          id="box"
          style={{
            border: "3px solid #ced4da",
            borderRadius: "10px",
            padding: "20px",
            margin: "5px",
          }}
          className="row justfy-contain-center"
        >
          <div className="col-md-10">
            <div class="mb-3">
              <label for="title" className="form-label">
                
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Please Type The Text Here"
                value={title}
                onChange={titleInputHandler}
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" className="form-label">
           
                Description
              </label>
              <textarea
                className="form-control"
                id="desc"
                rows="6"
                placeholder="Enter Notes Here"
                value={desc}
                onChange={descInputHandler}
              >
               
              </textarea>
            </div>
            <div className="text-center">
              <button
                type="button"
                class="btn btn-primary "
                onClick={(e) => (id ? editNotesHandler(e) : addNotesHandler(e))}
              >
               
                {id ? "Edit Note" : "Add Note"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

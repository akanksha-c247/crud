import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [titleError, setTitleError] = useState("");
  const [bodyError, setBodyError] = useState("");
  const history = useNavigate();
  const existingData = JSON.parse(localStorage.getItem("newPostData"));

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Reset previous error messages
    setTitleError("");
    setBodyError("");

    let isValid = true;

    if (title.trim() === "") {
      setTitleError("Title is required");
      isValid = false;
    }

    if (body.trim() === "") {
      setBodyError("Body is required");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          body: body,
          userId: 2,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await response.json();
      console.log("New post created:", data);
      history("/", { state: { newData: data } });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            className={`form-control ${titleError && "border border-danger"}`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {titleError && <p className="text-danger">{titleError}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            className={`form-control ${bodyError && "border border-danger"}`}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          {bodyError && <p className="text-danger">{bodyError}</p>}
        </div>
        <button type="submit" className="btn btn-primary">
          Create Post
        </button>
      </form>
    </div>
  );
};

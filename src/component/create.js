import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const history = useNavigate();
  const existingData = JSON.parse(localStorage.getItem("newPostData"));

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          body: JSON.stringify({
            title: title,
            body: body,
            userId: 2,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      debugger;
      const data = await response.json();
      console.log("New post created:", data);
      // localStorage.getItem("newPostData", JSON.stringify(data));
      // localStorage.setItem("newPostData", JSON.stringify(data));
      const newData = existingData ? [...existingData, data] : [data];
      localStorage.setItem("newPostData", JSON.stringify(newData));
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
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            className="form-control"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Post
        </button>
      </form>
    </div>
  );
};

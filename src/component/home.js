import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/home.css";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
export const Home = () => {
  const location = useLocation();

  const history = useNavigate();
  const [posts, setPosts] = useState([]);

  const [editedPost, setEditedPost] = useState({});
  const [editedPostIndex, setEditedPostIndex] = useState(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        const newData =
          location.state && location.state.newData
            ? [location.state.newData]
            : [];
            // const filteredPosts = response.data.filter((post) => {
            //   return !localStorage.getItem(`post_${post.id}`);
            // });
        setPosts((prevDataArray) => [
          ...prevDataArray,
          // ...filteredPosts,
          ...response.data,
          ...newData,
        ]);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleEdit = (index) => {
    setShow(true);
    setEditedPost(posts[index]);
    setEditedPostIndex(index);
  };
  const handleClose = () => setShow(false);
  const handleEditSubmit = () => {
    if (editedPostIndex !== null) {
      const updatedPosts = [...posts];
      updatedPosts[editedPostIndex] = editedPost;
      setShow(false);
      setPosts(updatedPosts);
      setEditedPostIndex(null);
    }
  };

  const handleDelete = (id) => {
    console.log("delete", posts);
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        localStorage.setItem(`post_${id}_deleted`, true); 
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
        console.log("Post deleted successfully:", response);
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };
  const createSubmit = () => {
    history("/create");
  };
  return (
    <div className="container mt-5">
      <h2 className="table-title">Posts Table</h2>
      <button onClick={createSubmit} className="btn btn-success">
        Create
      </button>
      <table className="posts-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th><th>Edit</th><th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td><td>{post.body}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editedPostIndex !== null && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
             <label htmlFor="editedTitle">Title:</label>
                <input
                  type="text"
                  id="editedTitle"
                  value={editedPost.title}
                  onChange={(e) =>
                    setEditedPost({ ...editedPost, title: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
               <label htmlFor="editedBody">Body:</label>
                <textarea
                  id="editedBody"
                  value={editedPost.body}
                  onChange={(e) =>
                    setEditedPost({ ...editedPost, body: e.target.value })
                  }
                />
              </div>
            </form>
            <button onClick={handleEditSubmit}>Save</button>
            <button onClick={() => setEditedPostIndex(null)}>Cancel</button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditSubmit}>
              Save
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

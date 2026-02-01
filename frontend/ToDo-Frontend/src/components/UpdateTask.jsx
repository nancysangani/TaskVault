import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateTask() {
  const [updatedTask, setUpdatedTask] = React.useState({
    title: "",
    description: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchTask() {
      let response = await fetch(`http://localhost:3000/update-task/${id}`, {
        credentials: "include",
      });

      if (!response.ok) {
        console.error("Failed to fetch task");
        return;
      }

      let data = await response.json();
      setUpdatedTask(data);
    }
    fetchTask();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setUpdatedTask((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch(`http://localhost:3000/update-task/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    navigate("/");
  }

  return (
    <div className="container">
      <h1>Update Task</h1>
      <form className="todo-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Task Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={updatedTask.title || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Task Description:</label>
          <textarea
            id="description"
            name="description"
            value={updatedTask.description || ""}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
}

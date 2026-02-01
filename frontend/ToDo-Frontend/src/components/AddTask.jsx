import React from "react";
import { useNavigate } from "react-router-dom";

export default function AddTask() {
  const [taskData, setTaskData] = React.useState({
    title: "",
    description: ""
  });

  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let tasks = await fetch("http://localhost:3000/add-task", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    })
    tasks = await tasks.json();
    console.log(tasks);
    navigate("/");
  }

  return (
  <div className="container">
    <h1>Add New Task</h1>
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Task Title:</label>
        <input placeholder="Enter task title" type="text" id="title" name="title" value={taskData?.title || ""} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="description">Task Description:</label>
        <textarea placeholder="Enter task description" id="description" name="description" value={taskData?.description || ""} onChange={handleChange} required></textarea>
      </div>
      <button type="submit">Add Task</button>
    </form>
  </div>
  );
}
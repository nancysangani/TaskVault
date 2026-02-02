import React from "react";
import { Link, useLocation } from "react-router-dom";
import API_URL from './../config.js';

export default function Tasks() {
  const [tasks, setTasks] = React.useState([]);
  const location = useLocation();
  const [infoMessage, setInfoMessage] = React.useState("");

  React.useEffect(() => {
    if (location.state?.fromAuthPage) {
      setInfoMessage("Welcome back! You are already logged in.");
      setTimeout(() => setInfoMessage(""), 5000);
    }
  }, [location.state]);

  React.useEffect(() => {
    async function fetchTasks() {
      try {
        let response = await fetch(`${API_URL}`, {
          credentials: "include",
        });

        if (!response.ok) {
          // Handle 401/403
          const errorText = await response.text();
          console.error("Error fetching tasks:", errorText);
          setInfoMessage("Failed to load tasks. Please log in again.");
          setTasks([]);
          return;
        }

        let data = await response.json();
        setTasks(data);
      } catch (err) {
        console.error("Network error:", err);
        setInfoMessage("Network error while fetching tasks.");
        setTasks([]);
      }
    }
    fetchTasks();
  }, []);

  async function deleteTask(id) {
    let response = await fetch(`${API_URL}/delete-task/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    let data = await response.json();
    console.log("Task deleted:", data);
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
  }

  return (
    <div className="container">
      <h1>Tasks List</h1>

      {infoMessage && (
        <p
          className="auto-fade"
          style={{ color: "green", fontSize: "18px", marginBottom: "20px" }}
        >
          {infoMessage}
        </p>
      )}

      <ul className="task-list">
        {tasks ? (
          tasks.map((task) => (
            <li className="task-item" key={task._id}>
              <div className="task-content">
                <h2>{task.title}</h2>
                <p>{task.description}</p>
              </div>
              <div className="task-actions">
                <input type="checkbox" name="selectedTasks" value={task._id} />
                <button
                  className="btn-delete"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>

                <Link className="update-task" to={`/update-task/${task._id}`}>
                  Update
                </Link>
              </div>
            </li>
          ))
        ) : (
          <li>No tasks available</li>
        )}
      </ul>
    </div>
  );
}

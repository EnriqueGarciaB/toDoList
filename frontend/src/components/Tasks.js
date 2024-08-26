import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5001/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        setError(
          "Error fetching tasks: " +
            (error.response ? error.response.data.message : error.message)
        );
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="containerFormLogin">
      <h2>Tasks</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <TaskForm
        setTasks={setTasks}
        currentTask={currentTask}
        setCurrentTask={setCurrentTask}
      />
      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        setCurrentTask={setCurrentTask}
      />
    </div>
  );
};

export default Tasks;

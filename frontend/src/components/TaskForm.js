import React, { useState, useEffect } from "react";
import { createTask, updateTask } from "../utils/api";

const TaskForm = ({ setTasks, currentTask, setCurrentTask }) => {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("pending");
  const [subtasks, setSubtasks] = useState([]);

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title || "");
      setStatus(currentTask.status || "pending");
      setComment(
        currentTask.comments.length ? currentTask.comments[0].text : ""
      );
      setSubtasks(currentTask.subtasks || []);
    }
  }, [currentTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let updatedTask;
      if (currentTask) {
        updatedTask = await updateTask(currentTask._id, {
          title,
          status,
          comments: comment ? [{ text: comment }] : [],
          subtasks,
        });
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === updatedTask._id ? updatedTask : task
          )
        );
        setCurrentTask(null);
      } else {
        updatedTask = await createTask({
          title,
          status,
          comments: comment ? [{ text: comment }] : [],
          subtasks,
        });
        setTasks((prevTasks) => [...prevTasks, updatedTask]);
      }
      setTitle("");
      setStatus("pending");
      setComment("");
      setSubtasks([]);
    } catch (error) {
      console.error("Error saving task", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Add a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="pending">pending</option>
        <option value="completed">completed</option>
      </select>
      <button type="submit">{currentTask ? "Update Task" : "Add Task"}</button>
    </form>
  );
};

export default TaskForm;

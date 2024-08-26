import React, { useState } from "react";
import {
  deleteTask,
  createSubtask,
  updateSubtask,
  deleteSubtask,
} from "../utils/api";

const TaskList = ({ tasks, setTasks, setCurrentTask }) => {
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error(
        "Error deleting task",
        error.response?.data || error.message
      );
    }
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
  };

  const handleAddSubtask = async (taskId) => {
    try {
      const newSubtask = { title: newSubtaskTitle, status: "pending" };
      const updatedTask = await createSubtask(taskId, newSubtask);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? updatedTask : task))
      );
      setNewSubtaskTitle("");
    } catch (error) {
      console.error(
        "Error adding subtask",
        error.response?.data || error.message
      );
    }
  };

  const handleDeleteSubtask = async (taskId, subtaskId) => {
    try {
      const updatedTask = await deleteSubtask(taskId, subtaskId);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? updatedTask : task))
      );
    } catch (error) {
      console.error(
        "Error deleting subtask",
        error.response?.data || error.message
      );
    }
  };

  const handleSubtaskStatusToggle = async (taskId, subtask) => {
    try {
      const updatedSubtask = {
        ...subtask,
        status: subtask.status === "pending" ? "completed" : "pending",
      };
      const updatedTask = await updateSubtask(
        taskId,
        subtask._id,
        updatedSubtask
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? updatedTask : task))
      );
    } catch (error) {
      console.error(
        "Error updating subtask",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-2xl font-bold mb-4">Task List</h3>
      {tasks.length === 0 ? (
        <p className="text-gray-600">No tasks available.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {tasks.map((task) => (
            <div
              key={task?._id}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
            >
              <h4 className="text-xl font-semibold mb-2">
                Title: {task?.title}
              </h4>

              {task?.comments && task?.comments.length > 0 && (
                <div className="mb-2">
                  <h5 className="text-lg font-medium">Comments:</h5>
                  <ul className="list-disc pl-5 text-gray-700">
                    {task.comments.map((comment, index) => (
                      <li key={index}>{comment?.text}</li>
                    ))}
                  </ul>
                </div>
              )}

              {task?.subtasks && task?.subtasks.length > 0 && (
                <div className="mb-2">
                  <h5 className="text-lg font-medium">Subtasks:</h5>
                  <ul className="list-disc pl-5 text-gray-700">
                    {task.subtasks.map((subtask) => (
                      <li key={subtask?._id}>
                        <span
                          onClick={() =>
                            handleSubtaskStatusToggle(task?._id, subtask)
                          }
                          className={`cursor-pointer ${
                            subtask?.status === "completed" ? "line" : ""
                          }`}
                        >
                          {subtask?.title} ({subtask?.status})
                        </span>
                        <button
                          onClick={() =>
                            handleDeleteSubtask(task?._id, subtask?._id)
                          }
                          className="ml-2 text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center">
                <input
                  type="text"
                  value={newSubtaskTitle}
                  onChange={(e) => setNewSubtaskTitle(e.target.value)}
                  className="border rounded p-2 mr-2 flex-grow"
                  placeholder="Add new subtask..."
                />
                <button
                  onClick={() => handleAddSubtask(task?._id)}
                  className="bg-green-500 text-xs text-white px-4 py-2 rounded hover:bg-green-600 transition"
                >
                  Add Subtask
                </button>
              </div>

              <h5 className="text-md font-medium text-gray-500 mt-4">
                Status: {task?.status}
              </h5>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleEdit(task)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task?._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;

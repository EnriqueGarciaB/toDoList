import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users/login`, userData);
  return response.data;
};

//TASKS

export const getTasks = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createTask = async (taskData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${API_URL}/tasks`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateTask = async (taskId, taskData) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(`${API_URL}/tasks/${taskId}`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteTask = async (taskId) => {
  const token = localStorage.getItem("token");
  await axios.delete(`${API_URL}/tasks/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

//SUBTASKS

export const createSubtask = async (taskId, subtaskData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${API_URL}/tasks/${taskId}/subtasks`,
    subtaskData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const updateSubtask = async (taskId, subtaskId, subtaskData) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(
    `${API_URL}/tasks/${taskId}/subtasks/${subtaskId}`,
    subtaskData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const deleteSubtask = async (taskId, subtaskId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/tasks/${taskId}/subtasks/${subtaskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error in deleteSubtask:", error.response?.data || error.message);
    throw error;
  }
};

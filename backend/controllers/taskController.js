const Task = require("../models/taskModel");

// Obtener todas las tareas para el usuario autenticado
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

// Crear una nueva tarea
const createTask = async (req, res) => {
  const { title, status, comments } = req.body;

  try {
    const task = new Task({
      title,
      status,
      comments: comments || [],
      user: req.user._id,
    });

    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res
      .status(400)
      .json({ message: "Error creating task", error: error.message });
  }
};

// Actualizar una tarea (estatus o contenido)
const updateTask = async (req, res) => {
  const { title, status, subtasks, comments } = req.body;
  try {
    const task = await Task.findById(req.params.id);

    task.title = title || task.title;
    task.status = status || task.status;
    task.subtasks = subtasks || task.subtasks;
    task.comments = comments || task.comments;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(400).json({ message: "Error updating task" });
  }
};

// Eliminar una tarea
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await Task.findByIdAndDelete(taskId);

    res.json({ message: "Task removed successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Error deleting task" });
  }
};

// Añadir una subtarea a una tarea
const addSubtask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    task.subtasks.push(req.body);
    const updatedTask = await task.save();
    res.status(201).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: "Error adding subtask" });
  }
};

// Actualizar una subtarea
const updateSubtask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    const subtask = task.subtasks.id(req.params.subtaskId);
    if (!subtask) {
      return res.status(404).json({ message: "Subtask not found" });
    }

    subtask.title = req.body.title || subtask.title;
    subtask.status = req.body.status || subtask.status;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: "Error updating subtask" });
  }
};

// Eliminar una subtarea
const deleteSubtask = async (req, res) => {
  try {
    const { taskId, subtaskId } = req.params;

    const task = await Task.findById(taskId);

    if (!task || task.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Task not found" });
    }

    const subtaskIndex = task.subtasks.findIndex(
      (subtask) => subtask._id.toString() === subtaskId
    );

    if (subtaskIndex === -1) {
      return res.status(404).json({ message: "Subtask not found" });
    }

    task.subtasks.splice(subtaskIndex, 1);

    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    console.error("Error deleting the subtask:", error);
    res.status(500).json({ message: "Error deleting the subtask" });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  addSubtask,
  updateSubtask,
  deleteSubtask,
};

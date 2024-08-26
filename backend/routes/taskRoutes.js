const express = require("express");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  addSubtask,
  updateSubtask,
  deleteSubtask,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Rutas de tareas
router.route("/").get(protect, getTasks).post(protect, createTask);
router.route("/:id").put(protect, updateTask).delete(protect, deleteTask);

// Rutas de subtareas
router.route("/:taskId/subtasks").post(protect, addSubtask);
router
  .route("/:taskId/subtasks/:subtaskId")
  .put(protect, updateSubtask)
  .delete(protect, deleteSubtask);

module.exports = router;

const express = require("express");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

module.exports = app;

import asyncHandler from "express-async-handler";
import Task from "#app/models/Task.js";

// GET /api/tasks
// optional query params: ?completed=true/false, ?priority=high, ?sort=createdAt,-dueDate, ?limit=20&page=1
const getTasks = asyncHandler(async (req, res) => {
  const filter = { user: req.user.id };
  if (req.query.completed !== undefined) filter.completed = req.query.completed === "true";
  if (req.query.priority) filter.priority = req.query.priority;

  const page = Math.max(1, parseInt(req.query.page || "1"));
  const limit = Math.min(100, parseInt(req.query.limit || "50"));
  const skip = (page - 1) * limit;

  const sort = req.query.sort || "-createdAt";

  const tasks = await Task.find(filter).sort(sort).skip(skip).limit(limit);
  res.json(tasks);
});

// POST /api/tasks
const createTask = asyncHandler(async (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  const task = await Task.create({
    user: req.user.id,
    title,
    description,
    dueDate,
    priority,
  });
  res.status(201).json(task);
});

// GET /api/tasks/:id
const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task || task.user.toString() !== req.user.id) {
    res.status(404);
    throw new Error("Task not found");
  }
  res.json(task);
});

// PUT /api/tasks/:id
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task || task.user.toString() !== req.user.id) {
    res.status(404);
    throw new Error("Task not found");
  }

  const updates = ["title", "description", "dueDate", "priority", "completed"];
  updates.forEach((field) => {
    if (req.body[field] !== undefined) task[field] = req.body[field];
  });

  const updated = await task.save();
  res.json(updated);
});

// DELETE /api/tasks/:id
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task || task.user.toString() !== req.user.id) {
    res.status(404);
    throw new Error("Task not found");
  }
  await task.deleteOne();
  res.json({ message: "Task deleted" });
});

// PATCH /api/tasks/:id/complete
const markComplete = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task || task.user.toString() !== req.user.id) {
    res.status(404);
    throw new Error("Task not found");
  }

  if (req.body.completed === undefined) {
    task.completed = !task.completed;
  } else {
    task.completed = !!req.body.completed;
  }
  await task.save();
  res.json(task);
});

export { getTasks, createTask, getTask, updateTask, deleteTask, markComplete };

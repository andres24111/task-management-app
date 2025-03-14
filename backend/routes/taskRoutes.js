const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const router = express.Router();

// Create a new task
router.post('/tasks', auth, async (req, res) => {
  const task = new Task({ ...req.body, user: req.user.id });
  await task.save();
  res.status(201).json(task);
});

// Get all tasks for the logged-in user
router.get('/tasks', auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(tasks);
});

router.post('/', auth, async (req, res) => {
  const { title, description, deadline, priority } = req.body;
  if (!title) return res.status(400).json({ error: 'title required' });
  const task = new Task({ userId: req.user.id, title, description: description || '', deadline, priority });
  await task.save();
  res.status(201).json(task);
});

router.put('/:id', auth, async (req, res) => {
  const updates = req.body;
  updates.updatedAt = Date.now();
  const task = await Task.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, updates, { new: true });
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

router.delete('/:id', auth, async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json({ success: true });
});

module.exports = router;

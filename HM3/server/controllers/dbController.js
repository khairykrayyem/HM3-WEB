const Task = require('../models/Task');

// שליפת כל המשימות
async function getTasks(req, res) {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
}

// הוספת משימה חדשה
async function addTask(req, res) {
  try {
    const { title } = req.body;
    const newTask = new Task({ title });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ error: "Failed to add task" });
  }
}

// החלפת מצב המשימה
async function toggleTask(req, res) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    task.done = !task.done;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: "Failed to toggle task" });
  }
}

// מחיקת משימה
async function deleteTask(req, res) {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete task" });
  }
}

module.exports = {
  getTasks,
  addTask,
  toggleTask,
  deleteTask,
};

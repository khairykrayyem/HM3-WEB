const express = require('express');
const router = express.Router();
const {
  getTasks,
  addTask,
  toggleTask,
  deleteTask,
} = require('../controllers/dbController');

router.get('/tasks', getTasks);
router.post('/tasks', addTask);
router.patch('/tasks/:id', toggleTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;

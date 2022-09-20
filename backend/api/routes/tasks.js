let express = require('express');
let router = express.Router();

const TaskController = require("../controllers/tasks");

// get all tasks
router.get('/', TaskController.get_all_tasks);

// get all tasks per user
router.get('/user/:userId', TaskController.tasks_get_by_user);

// get task by id
router.get('/:taskId', TaskController.get_task);

// add task
router.post('/', TaskController.add_task);

// update task
router.patch('/:taskId', TaskController.update_task);

// delete task
router.delete('/:taskId', TaskController.delete_task);

module.exports = router;

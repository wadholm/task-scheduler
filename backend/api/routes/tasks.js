let express = require('express');
let router = express.Router();
const mongoose = require("mongoose");

const Task = require("../models/task");

// get all tasks
router.get('/', function(req, res, next) {
    res.status(200).json({
        message: "Tasks."
    });
});

// get task by id
router.get('/:taskId', (req, res, next) => {

    res.status(200).json({
        message: "Task details.",
        taskId: req.params.taskId
    });
});

// add task
router.post('/', (req, res, next) => {
    const task = new Task({
        _id: new mongoose.Types.ObjectId(),
        user_id: req.body.userId,
        description: req.body.description,
        category: req.body.category,
        state: req.body.state,
        start_time: req.body.start_time,
        deadline: req.body.deadline,
        est_duration: req.body.est_duration
    });
    task.save()
    .then(result => {
        console.log(result);
    })
    .catch(err => console.error(err));

    res.status(201).json({
        message: `Task created.`,
        createdTask: task
    });
});

// update task
router.patch('/:taskId', (req, res, next) => {
    res.status(200).json({
        message: `Task updated.`,
        taskId: req.params.taskId
    });
});

// delete task
router.delete('/:taskId', (req, res, next) => {
    res.status(200).json({
        message: `Task deleted.`,
        taskId: req.params.taskId
    });
});


module.exports = router;
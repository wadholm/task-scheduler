const mongoose = require("mongoose");

const Task = require("../models/task");

exports.get_all_tasks = (req, res) => {
    Task.find()
        .select("-__v")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                tasks: docs
            };

            res.status(200).json(response);
        })
        .catch(err => {
            // console.error(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.get_task = (req, res) => {
    const id = req.params.taskId;

    Task.findById(id)
        .select("-__v")
        .exec()
        .then(doc => {
            if (doc) {
                return res.status(200).json({
                    task: doc
                });
            }
            res.status(404).json({
                message: "No valid entry found for provided ID."
            });
        })
        .catch(err => {
            // console.error(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.add_task = (req, res) => {
    if (!req.body.user) {
        return res.status(401).json({
            message: "User missing."
        });
    }
    const task = new Task({
        _id: new mongoose.Types.ObjectId(),
        user: req.body.user,
        description: req.body.description,
        category: req.body.category,
        state: req.body.state,
        start_time: req.body.start_time,
        deadline: req.body.deadline,
        est_duration: req.body.est_duration
    });

    task.save()
        .then(result => {
            res.status(201).json({
                message: `Task created.`,
                createdTask: result
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.update_task = (req, res) => {
    const id = req.params.taskId;
    const updateOps = {};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Task.findByIdAndUpdate(id, { $set: updateOps }, {new: true})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Task succesfully updated.",
                updatedTask: {
                    _id: result._id,
                    user: result.user,
                    description: result.description,
                    category: result.category,
                    state: result.state,
                    start_time: result.start_time,
                    deadline: result.deadline,
                    est_duration: result.est_duration,
                    act_duration: result.act_duration
                }
            });
        })
        .catch(err => {
            // console.error(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.delete_task = (req, res) => {
    const id = req.params.taskId;

    Task.findByIdAndDelete(id)
        .exec()
        .then(result => {
        // console.log(`Deleted task: ${result}`);
            if (result) {
                return res.status(200).json({
                    message: `Task deleted.`
                });
            }
            res.status(404).json({
                message: "No valid entry found for provided ID."
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: err
            });
        });
};

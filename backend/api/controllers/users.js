const mongoose = require("mongoose");

const User = require("../models/user");
const Task = require("../models/task");

exports.get_all_users = (req, res) => {
    User.find()
        .select("-__v")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                users: docs
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

exports.get_user = (req, res) => {
    const id = req.params.userId;

    User.findById(id)
        .select("-__v")
        .exec()
        .then(doc => {
            if (doc) {
                return res.status(200).json({
                    user: doc
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

exports.add_user = (req, res) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (!req.body.email || !req.body.password) {
                return res.status(401).json({
                    message: "Email or password missing."
                });
            }

            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Email already exists"
                });
            }
            user = new User({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            user.save()
                .then(result => {
                    res.status(201).json({
                        message: `User created.`,
                        createdUser: result
                    });
                })
                .catch(err => {
                // console.error(err);
                    res.status(500).json({
                        error: err
                    });
                });
        });
};

exports.update_user = (req, res) => {
    const id = req.params.userId;
    const updateOps = {};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    User.findByIdAndUpdate(id, { $set: updateOps }, {new: true})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User succesfully updated.",
                updatedUser: {
                    _id: result._id,
                    name: result.name,
                    email: result.email,
                    password: result.password,
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

exports.delete_user = (req, res) => {
    const id = req.params.userId;
    let tasksDeletedcount;

    Task.deleteMany({user: id})
        .exec()
        .then(result => {
            tasksDeletedcount = result.deletedCount;

            User.findOneAndDelete(id)
                .exec()
                .then(result => {
                    res.status(200).json({
                        message:
                        `User with ID: ${result._id} and ` +
                        `${tasksDeletedcount} related tasks deleted.`
                    });
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({
                        error: err
                    });
                });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: err
            });
        });
};

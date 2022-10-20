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

            // create 52 weeks
            function generateWeeks() {
                var weeks = [];

                for (var i = 1; i <= 52; i++) {
                    let obj = {
                        week: i,
                        capacity_left: 40
                    };

                    weeks.push(obj);
                }
                return weeks;
            }
            // create 10 years
            function generateYears(weeks) {
                var min = new Date().getFullYear();
                var max = min + 10;
                var years = [];

                for (var i = min; i <= max; i++) {
                    let obj = {
                        year: i,
                        weeks: weeks
                    };

                    years.push(obj);
                }
                return years;
            }

            let weeks = generateWeeks();
            let years = generateYears(weeks);

            // console.log(years[0].weeks[51].capacity.total_capacity);
            // console.log(years);

            user = new User({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                years: years
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
                    capacity: result.capacity,
                    categories: result.categories
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

exports.update_capacity_left = (req, res) => {
    const id = req.params.userId;
    const year = req.body.year;
    const week = req.body.week;
    const capacityLeft = req.body.capacity_left;


    User.findOneAndUpdate(
        {_id: id},
        {"$set": {[`years.$[outer].weeks.$[inner].capacity_left`]: capacityLeft} },
        {"arrayFilters": [{ "outer.year": year }, { "inner.week": week }]})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User succesfully updated.",
                updatedUser: {
                    _id: result._id,
                    name: result.name
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

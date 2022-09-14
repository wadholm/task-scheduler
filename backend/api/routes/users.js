let express = require('express');
let router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/user");

// get all users
router.get('/', function(req, res, next) {
    res.status(200).json({
        message: "Users."
    });
});

// get user by id
router.get('/:userId', (req, res, next) => {

    res.status(200).json({
        message: "User details.",
        userId: req.params.userId
    });
});

// add user
router.post('/', (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    user.save()
    .then(result => {
        console.log(result);
    })
    .catch(err => console.error(err));
    
    res.status(201).json({
        message: `User created.`,
        createduser: user
    });
});

// update user
router.patch('/:userId', (req, res, next) => {
    res.status(200).json({
        message: `User updated.`,
        userId: req.params.userId
    });
});

// delete user
router.delete('/:userId', (req, res, next) => {
    res.status(200).json({
        message: `User deleted.`,
        userId: req.params.userId
    });
});


module.exports = router;
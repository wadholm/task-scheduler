const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true},
    description: String,
    category: String,
    state: String,
    start_time: Date,
    deadline: Date,
    est_duration: Number,
    act_duration: Number
});

module.exports = mongoose.model("Task", taskSchema);

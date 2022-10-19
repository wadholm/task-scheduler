const mongoose = require("mongoose");

// const capacitySchema = mongoose.Schema({
//     capacity: { type: Number, default: 40},
//     capacity_left: { type: Number, default: 40},
// });

// const weekSchema = mongoose.Schema({
//     week: { type: Number},
//     capacity: { type: capacitySchema}
// });

// const yearSchema = mongoose.Schema({
//     year: { type: Number },
//     weeks: { type: weekSchema}
// });

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        // eslint-disable-next-line max-len
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },
    categories: [],
    years: [],
    capacity: { type: Number, default: 40 },
    // categories: { type: Array, default: ["project", "daily"] }, // add default categories
});

module.exports = mongoose.model("User", userSchema);

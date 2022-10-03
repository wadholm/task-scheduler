const User = require("../models/user");


exports.add_category = (req, res) => {
    const id = req.params.userId;

    // no adding of duplicates
    User.findByIdAndUpdate(id, { $addToSet: {categories: req.body.category} })
        .exec()
        // eslint-disable-next-line no-unused-vars
        .then(_result => {
            // console.info(result);
            res.status(200).json({
                message: "Success."
            });
        })
        .catch(err => {
        // console.error(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.update_category = (req, res) => {
    const id = req.params.userId;
    const prevValue = req.body.prev_value;
    const newValue = req.body.new_value;

    User.updateOne({ _id: id, categories: prevValue }, { $set: {"categories.$": newValue} })
        .exec()
        .then(result => {
            if (result.modifiedCount > 0) {
                return res.status(200).json({
                    message: "Category updated."
                });
            }
            res.status(404).json({
                message: "No valid entry found."
            });
        })
        .catch(err => {
        // console.error(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.delete_category = (req, res) => {
    const id = req.params.userId;

    User.updateOne({ _id: id}, { $pull: {categories: req.body.category} })
        .exec()
        .then(result => {
            if (result.modifiedCount > 0) {
                return res.status(200).json({
                    message: "Category deleted."
                });
            }
            res.status(404).json({
                message: "No valid entry found."
            });
        })
        .catch(err => {
            // console.error(err);
            res.status(500).json({
                error: err
            });
        });
};



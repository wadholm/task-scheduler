const User = require("../models/user");


exports.add_category = (req, res) => {
    const id = req.params.userId;
    let before;
    let after;
    let message = "Category already exists.";
    let addedCount = 0;

    User.findById(id)
        .exec()
        .then(result => {
            before = result.categories.length;
            // no adding of duplicates
            User.findByIdAndUpdate(id, { $addToSet: {categories: req.body.category}, }, {new: true})
                .exec()
                .then(result => {
                    after = result.categories.length;

                    // category has been added
                    if (after != before) {
                        message = "New category has been added.";
                        addedCount = 1;
                    }
                    res.status(200).json({
                        message: message,
                        addedCount: addedCount
                    });
                })
                .catch(err => {
                    // console.error(err);
                    res.status(500).json({
                        error: err
                    });
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



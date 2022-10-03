let express = require('express');
let router = express.Router();

const CategoriesController = require("../controllers/categories");

// add category
router.post('/:userId', CategoriesController.add_category);

// update category
router.put('/:userId', CategoriesController.update_category);

// delete category
router.delete('/:userId', CategoriesController.delete_category);

module.exports = router;

const express = require("express");
const router = express.Router();

// Require controller modules.
const categoryController = require("../controllers/categoryController");
const itemController = require("../controllers/itemController");

// ITEM ROUTES

// Get home page
router.get("/get-index", itemController.index);

// Post request for creating an item
router.post("/item/create", itemController.item_create);

// Delete request for deleting an item
router.delete("/item/delete/:id", itemController.item_delete);

// Post request for updating an item
router.put("/item/:id", itemController.item_update);

// Get request for one item
router.get("/item/:id", itemController.item_detail);

// Get request for list of all items
router.get("/items", itemController.item_list);

// Get both items and categories
router.get("/bothitemcategories", itemController.items_and_categories);

// CATEGORY ROUTES

// Post request for creating a category
router.post("/category/create", categoryController.category_create);

// Delete request for deleting a category
router.delete("/category/delete/:id", categoryController.category_delete);

// Post request for updating a category
router.put("/category/:id", categoryController.category_update);

// Get request for one category
router.get("/category/:id", categoryController.category_detail);

// Get request for list of all categories
router.get("/categories", categoryController.category_list);

module.exports = router;
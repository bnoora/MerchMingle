const express = require("express");
const router = express.Router();

// Require controller modules.
const categoryController = require("../controllers/categoryController");
const itemController = require("../controllers/itemController");


// ITEM ROUTES

// Get home page
router.get("/", itemController.index);

// Get request for creating an item
router.get("/item/create", itemController.item_create_get);

// Post request for creating an item
router.post("/item/create", itemController.item_create_post);

// Get request for deleting an item
router.get("/item/:id/delete", itemController.item_delete_get);

// Post request for deleting an item
router.post("/item/:id/delete", itemController.item_delete_post);

// Get request for updating an item
router.get("/item/:id/update", itemController.item_update_get);

// Post request for updating an item
router.post("/item/:id/update", itemController.item_update_post);

// Get request for one item
router.get("/item/:id", itemController.item_detail);

// Get request for list of all items
router.get("/items", itemController.item_list);

// CATEGORY ROUTES

// Get request for creating a category
router.get("/category/create", categoryController.category_create_get);

// Post request for creating a category
router.post("/category/create", categoryController.category_create_post);

// Get request for deleting a category
router.get("/category/:id/delete", categoryController.category_delete_get);

// Post request for deleting a category
router.post("/category/:id/delete", categoryController.category_delete_post);

// Get request for updating a category
router.get("/category/:id/update", categoryController.category_update_get);

// Post request for updating a category
router.post("/category/:id/update", categoryController.category_update_post);

// Get request for one category
router.get("/category/:id", categoryController.category_detail);

// Get request for list of all categories
router.get("/categories", categoryController.category_list);

module.exports = router;
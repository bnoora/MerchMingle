const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");


// Display list of all Categories.
exports.category_list = asyncHandler(async (req, res, next) => {
    const categories = await Category.find().sort([["name", "ascending"]]);
    res.render("category_list", { title: "Categories", categories: categories });
});

// Display detail page for a specific Category.
exports.category_detail = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    const items = await Item.find({ category: req.params.id });
    res.render("category_detail", { title: "Category Detail", category: category, items: items });
});

// Display Category create form on GET.
exports.category_create_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category create GET");
};

// Handle Category create on POST.
exports.category_create_post = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category create POST");
};

// Display Category delete form on GET.
exports.category_delete_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category delete GET");
};

// Handle Category delete on POST.
exports.category_delete_post = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category delete POST");
};

// Display Category update form on GET.
exports.category_update_get = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category update GET");
};

// Handle Category update on POST.
exports.category_update_post = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category update POST");
};
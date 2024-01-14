const Item = require("../models/item");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");


// Display list of all Items.
exports.item_list = asyncHandler(async (req, res, next) => {
    const items = await Item.find().populate("category").sort([["name", "ascending"]]);
    res.render("item_list", { title: "Items", items: items });
});

// Display detail page for a specific Item.
exports.item_detail = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id).populate("category");
    res.render("item_detail", { title: "Item Detail", item: item });
});

// Display Item create form on GET.
exports.item_create_get = asyncHandler(async (req, res, next) => {
    const categories = await Category.find().sort([["name", "ascending"]]);
    res.render("item_form", { title: "Create Item", categories: categories });
});

// Handle Item create on POST.
exports.item_create_post = asyncHandler(async (req, res, next) => {
    const item = new Item({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        category: req.body.category
    });
    await item.save();
    res.redirect(item.url);
});

// Display Item delete form on GET.
exports.item_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item delete GET");
});

// Handle Item delete on POST.
exports.item_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item delete POST");
});

// Display Item update form on GET.
exports.item_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item update GET");
});

// Handle Item update on POST.
exports.item_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item update POST");
});

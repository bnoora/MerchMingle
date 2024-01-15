const Item = require("../models/item");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");


// Display home page.
exports.index = asyncHandler(async (req, res, next) => {
    const [numItems, numCategories] = await Promise.all([
        Item.countDocuments({}),
        Category.countDocuments({})
    ]);
    res.render("index", { title: "Inventory Home", numItems: numItems, numCategories: numCategories });
});

// Display list of all Items.
exports.item_list = asyncHandler(async (req, res, next) => {
    const items = await Item.find().populate("category").sort([["name", "ascending"]]);
    res.render("item_list", { title: "Items", items: items });
});

// Display detail page for a specific Item.
exports.item_detail = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id).populate("category");
    if (item == null) {
        const err = new Error("Item not found");
        err.status = 404;
        return next(err);
    }

    res.render("item_detail", { title: "Item Detail", item: item });
});

// Display Item create form on GET.
exports.item_create_get = asyncHandler(async (req, res, next) => {
    const categories = await Category.find().sort([["name", "ascending"]]);
    res.render("item_form", { title: "Create Item", categories: categories });
});

// Handle Item create on POST.
exports.item_create_post = asyncHandler(async (req, res, next) => {
    // Validate and sanitize fields.
    body("name", "Name must not be empty.").trim().isLength({ min: 2 }).escape();
    body("description", "Description must not be empty.").trim().isLength({ min: 2 }).escape();
    body("price", "Price must not be empty.").trim().isLength({ min: 1 }).escape();
    body("stock", "Number in stock must not be empty.").trim().isLength({ min: 1 }).escape();
    body("category", "Category must not be empty.").trim().isLength({ min: 1 }).escape();

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const item = new Item({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category
        });

        if (!errors.isEmpty()) {
            const categories = await Category.find().sort([["name", "ascending"]]);
            res.render("item_form", { title: "Create Item", categories: categories, item: item, errors: errors.array() });
            return;
        } else {
            await Item.create(req.body);
            res.redirect(item.url);
        }
    });
});

// Display Item delete form on GET.
exports.item_delete_get = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id)
    if (item == null) {
        res.redirect("/inventory/items");
    }
    res.render("item_delete", { title: "Delete Item", item: item });
});

// Handle Item delete on POST.
exports.item_delete_post = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id)
    if (item == null) {
        res.redirect("/inventory/items");
    }
    await Item.findByIdAndDelete(req.body.id);
    res.redirect("/inventory/items");
});

// Display Item update form on GET.
exports.item_update_get = asyncHandler(async (req, res, next) => {
    const [item, categories] = await Promise.all([
        Item.findById(req.params.id),
        Category.find().sort([["name", "ascending"]])
    ]);
    if (item == null) {
        const err = new Error("Item not found");
        err.status = 404;
        return next(err);
    }
    res.render("item_form", { title: "Update Item", item: item, categories: categories });
});

// Handle Item update on POST.
exports.item_update_post = asyncHandler(async (req, res, next) => {
    // Validate and sanitize fields.
    body("name", "Name must not be empty.").trim().isLength({ min: 2 }).escape();
    body("description", "Description must not be empty.").trim().isLength({ min: 2 }).escape();
    body("price", "Price must not be empty.").trim().isLength({ min: 1 }).escape();
    body("stock", "Number in stock must not be empty.").trim().isLength({ min: 1 }).escape();
    body("category", "Category must not be empty.").trim().isLength({ min: 1 }).escape();

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const item = new Item({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category,
            _id: req.params.id
        });

        if (!errors.isEmpty()) {
            const categories = await Category.find().sort([["name", "ascending"]]);
            res.render("item_form", { title: "Update Item", categories: categories, item: item, errors: errors.array() });
            return;
        } else {
            await Item.findByIdAndUpdate(req.params.id, item);
            res.redirect(item.url);
        }
    });
});

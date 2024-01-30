const Item = require("../models/item");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");


// Get stuff for home page
exports.index = asyncHandler(async (req, res, next) => {
    const [numItems, numCategories] = await Promise.all([
        Item.countDocuments({}),
        Category.countDocuments({})
    ]);
    res.json({numItems : numItems, numCategories : numCategories});
});

// Get both items and categories
exports.items_and_categories = asyncHandler(async (req, res, next) => {
    const [items, categories] = await Promise.all([
        Item.find().populate("category").sort([["name", "ascending"]]),
        Category.find().sort([["name", "ascending"]])
    ]);
    res.json({items: items, categories: categories});
});

// Get list of all items
exports.item_list = asyncHandler(async (req, res, next) => {
    const items = await Item.find().populate("category").sort([["name", "ascending"]]);
    res.json({items : items});
});

// Get item details
exports.item_detail = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id).populate("category");
    if (item == null) {
        res.status(404);
        res.json({error : "Item not found."});
    }
    res.json({item : item});
});

// Handle Item create on POST.
exports.item_create = [
    // Validation and sanitization middleware
    body("name", "Name must not be empty.").trim().isLength({ min: 2 }).escape(),
    body("description", "Description must not be empty.").trim().isLength({ min: 2 }).escape(),
    body("price", "Price must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("stock", "Number in stock must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("category", "Category must not be empty.").trim().isLength({ min: 1 }).escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.json({item: req.body, errors: errors.array() });
            return;
        }
        else {
            const item = await Item.create(req.body);
            res.json({item: item});
        }
    })
];

// Handle Item delete on DELETE.
exports.item_delete = asyncHandler(async (req, res, next) => {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (item == null) {
        res.status(404);
        res.json({error : "Item not found."});
    } else {
        res.status(200);
        res.json({message: "Item deleted."});
    }
});

// Handle Item update on POST.
exports.item_update = [
    // Validate and sanitize fields.
    body("name", "Name must not be empty.").trim().isLength({ min: 2 }).escape(),
    body("description", "Description must not be empty.").trim().isLength({ min: 2 }).escape(),
    body("price", "Price must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("stock", "Number in stock must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("category", "Category must not be empty.").trim().isLength({ min: 1 }).escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400);
            res.json({item: req.body, errors: errors.array() });
            return;
        }
        else {
            const item = await Item.findByIdAndUpdate(req.params.id, req.body);
            res.json({item: item});
        }
    })
];
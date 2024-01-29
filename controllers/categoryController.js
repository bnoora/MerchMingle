const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");


// Get a list of all Categories.
exports.category_list = asyncHandler(async (req, res, next) => {
    const categories = await Category.find().sort([["name", "ascending"]]);
    res.json({categories: categories});
});

// Get a specific Category.
exports.category_detail = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    const items = await Item.find({ category: req.params.id });
    res.json({category: category, items: items});
});

// Handle Category create on POST.
exports.category_create = [
    body("name", "Category name required").trim().isLength({ min: 1 }).escape(),
    body("description", "Category description required").trim().isLength({ min: 1 }).escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.json({category: req.body, errors: errors.array() });
            return;
        }
        else {
            const category = await Category.create(req.body);
            res.json({category: category});
        }
    })
];

// Handle Category delete on DELETE.
exports.category_delete = asyncHandler(async(req, res, next) => {
    const [category, items] = await Promise.all([
        Category.findById(req.body.categoryid),
        Item.find({ category: req.params.id })
    ]);
    if (category == null) {
        res.status(404);
        res.json({error : "Category not found."});
    }
    if (items.length > 0) {
        res.status(400);
        res.json({error : "Category has items."});
    } else {
        res.status(200);
        res.json({message: "Category deleted."});
    }
});


// Handle Category update on POST.
exports.category_update = [
    body("name", "Category name required").trim().isLength({ min: 1 }).escape(),
    body("description", "Category description required").trim().isLength({ min: 1 }).escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400);
            res.json({category: req.body, errors: errors.array() });
            return;
        } else {
            const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body);
            res.json({category: updatedCategory});
        }
    })
];
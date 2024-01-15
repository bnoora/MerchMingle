const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");


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
    res.render("category_form", { title: "Create Category" });
};

// Handle Category create on POST.
exports.category_create_post = [
    body("name", "Category name required").trim().isLength({ min: 1 }).escape(),
    body("description", "Category description required").trim().isLength({ min: 1 }).escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render("category_form", { title: "Create Category", category: req.body, errors: errors.array() });
            return;
        } else {
            const foundCategory = await Category.findOne({ name: req.body.name });
            if (foundCategory) {
                res.redirect(foundCategory.url);
            } else {
                const newCat = await Category.create(req.body);
                res.redirect(newCat.url); // Ensure this URL is correctly generated in your Category model
            }
        }
    })
];

// Display Category delete form on GET.
exports.category_delete_get = asyncHandler(async(req, res, next) => {
    const [category, items] = await Promise.all([
        Category.findById(req.params.id),
        Item.find({ category: req.params.id })
    ]);
    if (category == null) {
        res.redirect("/inventory/categories");
    }
    res.render("category_delete", { title: "Delete Category", category: category, items: items });
});

// Handle Category delete on POST.
exports.category_delete_post = asyncHandler(async(req, res, next) => {
    const [category, items] = await Promise.all([
        Category.findById(req.params.id),
        Item.find({ category: req.params.id })
    ]);
    if (category == null) {
        res.redirect("/inventory/categories");
    }
    if (items.length > 0) {
        res.render("category_delete", { title: "Delete Category", category: category, items: items, 
        errors: "Category has items. Delete items first."});
        return;
    } else {
        await Category.findByIdAndDelete(req.body.id);
        res.redirect("/inventory/categories");
    }
});

// Display Category update form on GET.
exports.category_update_get = asyncHandler(async(req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (category == null) {
        res.redirect("/inventory/categories");
    }
    res.render("category_form", { title: "Update Category", category: category});
});

// Handle Category update on POST.
exports.category_update_post = asyncHandler(async(req, res, next) => {
    // Validate and sanitize fields.
    body("name", "Category name required").trim().isLength({ min: 1 }).escape();
    body("description", "Category description required").trim().isLength({ min: 1 }).escape();

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const category = new Category({
            name: req.body.name,
            description: req.body.description,
            _id: req.params.id
        });

        if (!errors.isEmpty()) {
            res.render("category_form", { title: "Update Category", category: category, errors: errors.array() });
            return;
        } else {
            const foundCategory = await Category.findOne({ name: req.body.name });
            if (foundCategory) {
                res.redirect(foundCategory.url);
            } else {
                await Category.findByIdAndUpdate(req.params.id, category);
                res.redirect(category.url);
            }
        }
    });
});
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: { type: String, required: true, minLenght: 2, maxLenght: 100 },
    description: { type: String, required: true, minLenght: 2, maxLenght: 100 }
});

categorySchema.virtual("url").get(function () {
    return `/inventory/category/${this._id}`;
});

module.exports = mongoose.model("Category", categorySchema);
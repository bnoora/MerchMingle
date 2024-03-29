const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: { type: String, required: true, minLenght: 2, maxLenght: 100 },
    description: { type: String, required: true, minLenght: 2, maxLenght: 100 },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true }
});

itemSchema.virtual("url").get(function () {
    return `/inventory/item/${this._id}`;
});

module.exports = mongoose.model("Item", itemSchema);


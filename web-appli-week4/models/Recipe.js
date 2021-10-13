const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let recipeSchema = new Schema({
    name: String,
    ingredients: Array,
    instructions: Array,
    categories: { type: Array, default: [] },
    images: { type: Array, default: [] }
});

module.exports = mongoose.model("Recipe", recipeSchema);

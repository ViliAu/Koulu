const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let bookSchema= new Schema({
    name: {type: String, required: true},
    author: {type: Array, required: true},
    pages: {type: Number, required: true}
});

module.exports = mongoose.model("Book", bookSchema);

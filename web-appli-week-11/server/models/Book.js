const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let bookSchema= new Schema({
    name: {type: String, required: true},
    author: {type: String, required: true},
    pages: {type: Number, required: true}
});

module.exports = mongoose.model("Book", bookSchema);

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let todoSchema = new Schema({
    user: {type: mongoose.Types.ObjectId, required: true, unique: true},
    items: {type: Array, required: true, default: []}
});

module.exports = mongoose.model("Todo", todoSchema);

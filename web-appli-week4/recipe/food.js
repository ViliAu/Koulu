const express = require("express");
const router = express.Router();

let reciper = [];

router.get("/", (req, res) => {
    res.json("Welcome to the recipe site");
})

router.get("/:food", (req, res) => {
    res.json({recipe: req.params.food});
})

module.exports = router;
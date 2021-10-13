const express = require("express");
const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");
const Category = require("../models/Category");
const router = express.Router();

/*async function i() {
    await new Category({ name: "Gluten-free" }).save();
    await new Category({ name: "Vegan" }).save();
    await new Category({ name: "Ovo" }).save();
}
i();*/

router.get("/", async (req, res) => {
    try {
        const result = await Category.find({});
        res.json(result);
    }
    catch {
        res.status(404).send("Something went wrong!");
    }
});

router.get("/:food", async (req, res) => {
    try {
        const result = await Recipe.findOne({ name: new RegExp(req.params.food, 'i') });
        res.json(result);
    }
    catch (e) {
        res.status(404).send("There is no recipe for" + req.params.food);
    }
});

router.post("/", async (req, res) => {
    try {
        const result = await Recipe.findOne({ name: new RegExp(req.body.name, 'i') });
        if (!result) {
            await new Recipe({
                name: req.body.name,
                ingredients: req.body.ingredients,
                instructions: req.body.instructions
            }).save();
            res.send(req.body);
        }
        else {
            res.status(403).send("There's already a recipe for " + req.body.name);
        }
        console.log(result);
    }
    catch (e) {
        res.status(404).send("Something went wrong!");
    }
});

module.exports = router;
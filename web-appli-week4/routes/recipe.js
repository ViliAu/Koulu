const express = require("express");
const router = express.Router();

let recipeList = [{name: "Pizza", ingredients: ["flour", "water", "yeast", "oil"], instructions: ["mix all of  the ingredients", "enjoy"]}];

router.get("/", (req, res) => {
    res.json("Welcome to the recipe api");
});

router.get("/:food", (req, res) => {
    const recipe = getRecipeByName(req.params.food);
    res.json(recipe ? recipe : {name: req.params.food});
});

router.post("/", (req, res) => {
    recipeList.push(req.body);
    console.log(req.body);
    res.send(req.body);
});

function getRecipeByName(name = "") {
    if (name === "")
        return null;
    let obj = null;
    for (let o of recipeList) {
        if (o.name.toLowerCase() === name.toLowerCase()) {
            obj = o;
            break;
        }
    }
    return obj;
}

module.exports = router;
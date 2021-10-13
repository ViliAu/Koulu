if (document.readyState !== "loading") {
    console.log("Document is ready");
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function () {
        console.log("Document ready after waiting!");
        initializeCode();
    })
}

let ingredientList = [];
let instructionList = [];

async function initializeCode() {
    const recipeData = await getRecipe("Pizza");
    if (recipeData)
        updateRecipe(recipeData);
    // Get special diets
    await getDiets();

    // Assign ingredient submit button function
    document.getElementById("add-ingredient").addEventListener("click", () => {
        const textArea = document.getElementById("ingredients-text");
        ingredientList.push(textArea.value);
        textArea.value = "";
    });
    // Assign instruction submit button function
    document.getElementById("add-instruction").addEventListener("click", () => {
        const textArea = document.getElementById("instructions-text");
        instructionList.push(textArea.value);
        textArea.value = "";
    });
    // Assign submit button function
    document.getElementById("submit").addEventListener("click", async () => {
        const name = document.getElementById("name-text");
        if (name.value.length === 0 || ingredientList.length === 0 || instructionList.length === 0)
            return;
        await submitData();
        name.value = "";
        ingredientList = [];
        instructionList = [];
    });
    // Assign reipe text input field event
    document.getElementById("recipe-search").addEventListener("keyup", async (key) => {
        if (key.key !== "Enter")
            return;
        const recipeSearch = document.getElementById("recipe-search");
        const recipe = await getRecipe(recipeSearch.value);
        if (recipe)
            updateRecipe(recipe);
        recipeSearch.value = "";
    });

}

async function getDiets() {
    try {
        const res = await fetch("http://localhost:1234/recipe");
        const dietArray = await res.json();
        if (res) {
            for (let i = 0; i < dietArray.length; i++) {
                const label = document.createElement("label");
                const textParent = document.createElement("p");
                const input = document.createElement("input");
                const textSpan = document.createElement("span");
                textSpan.innerHTML = dietArray[i].name;
                input.type = "checkbox";
                input.className = "filled-in";
                label.appendChild(input);
                label.appendChild(textSpan);
                textParent.appendChild(label);
                document.getElementById("diets-list").appendChild(textParent);
            }
        }
    }
    catch(e) {
        console.log(e);
    }
}

function updateRecipe(data) {
    document.getElementById("header").innerHTML = data.name;
    const ingList = document.getElementById("ingredients-list");
    const instList = document.getElementById("instructions-list");
    ingList.innerHTML = "";
    instList.innerHTML = "";
    for (let o of data.ingredients) {
        const ing = document.createElement("li");
        ing.innerHTML = o;
        ingList.appendChild(ing);
    }
    for (let o of data.instructions) {
        const inst = document.createElement("li");
        inst.innerHTML = o;
        instList.appendChild(inst);
    }
}

async function getRecipe(recipeName) {
    let res = null;
    res = await fetch("http://localhost:1234/recipe/" + recipeName);
    if (res) {
        const data = await res.json();
        return data;
    }
    else {
        return null;
    }
}

async function submitData() {
    const object = {
        name: document.getElementById("name-text").value,
        ingredients: ingredientList,
        instructions: instructionList
    }
    console.log(JSON.stringify(object));
    try {
        await fetch("http://localhost:1234/recipe/", {
            method: "post",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(object)
        });
    }
    catch (e) {
        console.log(e);
    }
    // Upload files
    await uploadFiles();
}

async function uploadFiles() {
    let files = document.getElementById("image-input").files;
    let data = new FormData();
    for (let img of files)
        data.append("images", img);
    await fetch("http://localhost:1234/images/", {
        method: "post",
        body: data
    });
    document.getElementById("image-input").value = null;
}
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

let dietList = [];

async function initializeCode() {
    // Get special diets
    await getDiets();

    // Display pizza recipe
    const recipeData = await getRecipe("Pizza");
    if (recipeData)
        updateRecipe(recipeData);

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
        const res = await fetch("/recipe");
        dietList = await res.json();
        if (res) {
            for (let i = 0; i < dietList.length; i++) {
                const label = document.createElement("label");
                const textParent = document.createElement("p");
                const input = document.createElement("input");
                const textSpan = document.createElement("span");
                textSpan.innerHTML = dietList[i].name;
                input.type = "checkbox";
                input.className = "filled-in diets-checkbox";
                label.appendChild(input);
                label.appendChild(textSpan);
                textParent.appendChild(label);
                document.getElementById("diet-buttons").appendChild(textParent);
            }
        }
    }
    catch (e) {
        console.log(e);
    }
}

function updateRecipe(data) {
    document.getElementById("header").innerHTML = data.name;
    const ingList = document.getElementById("ingredients-list");
    const instList = document.getElementById("instructions-list");
    const catList = document.getElementById("diets-list")
    ingList.innerHTML = "";
    instList.innerHTML = "";
    catList.innerHTML = "";
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
    for (let o of data.categories) {
        const cat = document.createElement("li");
        for (let i = 0; i < dietList.length; i++) {
            if (dietList[i]._id === o) {
                cat.innerHTML = dietList[i].name;
                break;
            }
        }
        catList.appendChild(cat);
    }
    // Update images
    updateImages(data.images);
}

async function updateImages(images) {
    document.getElementById("images").innerHTML = "";
    let imgArray = [];
    try {
        for (let i = 0; i < images.length; i++) {
            const res = await fetch(`/images/${images[i]}`);
            imgBlob = await res.blob();
            imgArray.push(imgBlob);
        }
    }
    catch (e) {
        console.log("Image fetching failed");
    }
    for (let o of imgArray) {
        let img = document.createElement("img");
        img.src = URL.createObjectURL(o);
        document.getElementById("images").appendChild(img);
    }
}

async function getRecipe(recipeName) {
    let res = null;
    res = await fetch("/recipe/" + recipeName);
    if (res) {
        const data = await res.json();
        return data;
    }
    else {
        return null;
    }
}

async function submitData() {
    // Get checked diets
    let dietArray = [];
    for (let o of document.getElementsByClassName("diets-checkbox")) {
        if (o.checked) {
            // fetch objectID by name
            for (let i = 0; i < dietList.length; i++) {
                if (dietList[i].name === o.parentElement.childNodes[1].innerHTML) {
                    dietArray.push(dietList[i]._id);
                    o.checked = false;
                    break;
                }
            }
        }
    }
    // Upload files to get the file ids
    const imgIDs = await uploadFiles();

    const object = {
        name: document.getElementById("name-text").value,
        ingredients: ingredientList,
        instructions: instructionList,
        categories: dietArray,
        images: imgIDs
    }
    console.log(JSON.stringify(object));
    try {
        await fetch("/recipe/", {
            method: "post",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(object)
        });
    }
    catch (e) {
        console.log(e);
    }
}

async function uploadFiles() {
    let files = document.getElementById("camera-file-input").files;
    let data = new FormData();
    for (let img of files)
        data.append("images", img);
    let res = null;
    try {
        res = await fetch("/images/", {
        method: "post",
        body: data
        });
    }
    catch(e) {
        console.log(e);
    }
    document.getElementById("camera-file-input").value = null;
    return await res.json();
}
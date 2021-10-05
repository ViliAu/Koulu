if(document.readyState !== "loading"){
    console.log("Document is ready");
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function(){
        console.log("Document ready after waiting!");
        initializeCode();
    })
}

let ingredientList = [];
let instructionList = [];

async function initializeCode() {
    document.getElementById("header").innerHTML = await getFood();
    // Assign ingredient submit button function
    document.getElementById("add-ingredient").addEventListener("click", () => {
        const textArea = document.getElementById("ingredients-text");
        ingredientList.push(textArea.value);
        console.log(textArea.value);
        textArea.value = "";
    });
    // Assign instruction submit button function
    document.getElementById("add-instruction").addEventListener("click", () => {
        const textArea = document.getElementById("instructions-text");
        instructionList.push(textArea.value);
        console.log(textArea.value);
        textArea.value = "";
    });
    // Assign submit button function
    document.getElementById("submit").addEventListener("click", async () => {
        const name = document.getElementById("name-text");
        if (name.value.length === 0 || ingredientList.length === 0 || instructionList.length === 0)
            return;
        await submitData();
        name.value = "";
    });
}

async function getFood() {
    const res = await fetch("http://[::1]:8000/recipe/pizza");
    const data = await res.json();
    return data.recipe;
}

async function submitData() {
    const object = {name: document.getElementById("name-text").value,
        ingredients: ingredientList,
        instructions: instructionList
    }
    console.log(JSON.stringify(object));
    const res = await fetch("http://[::1]:8000/recipe",  {
        method: "post",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(object)});
}

/*
method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: '{ "poem": "' + poemInput.value + '" }'
           })

*/

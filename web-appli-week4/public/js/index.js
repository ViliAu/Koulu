if(document.readyState !== "loading"){
    console.log("Document is ready");
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function(){
        console.log("Document ready after waiting!");
        initializeCode();
    })
}

async function initializeCode() {
    document.getElementById("header").innerHTML = await getFood();
}

async function getFood() {
    const res = await fetch("http://[::1]:8000/recipe/pizza");
    const data = await res.json();
    return data.recipe;
}

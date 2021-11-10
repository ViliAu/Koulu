if (document.readyState !== "loading") {
    console.log("Document is ready");
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function () {
        console.log("Document ready after waiting!");
        initializeCode();
    })
}

async function initializeCode() {
    let email = "";
    email = await validateToken();
    if (email.length > 0) {
        renderLoggedIn(email);
    }
    else {
        renderDefault();
    }
}

async function validateToken() {
    // Get token
    const authToken = localStorage.getItem("auth_token");
    if (!authToken) {
        return "";
    }
    try {
        res = await fetch("/api/private", {
            method: "GET",
            headers: { "authorization": "Bearer " + authToken }
        })
        if (res.ok) {
            data = await res.json();
            console.log(data);
            return data.email;
        }
        else {
            return "";
        }
    }
    catch {
        return "";
    }
}

function renderDefault() {
    let reg = document.createElement("a");
    reg.appendChild(document.createTextNode("Register"));
    let log = document.createElement("a");
    log.appendChild(document.createTextNode("Log in"));
    reg.href = "/register.html"
    log.href = "/login.html"
    document.getElementById('container').appendChild(reg);
    document.getElementById('container').appendChild(log);
}

async function renderLoggedIn(e) {
    let delBtn = document.createElement("button");
    delBtn.innerHTML = "Log out";
    delBtn.id = "logout";
    delBtn.addEventListener("click", () => {
        localStorage.removeItem("auth_token");
        window.location.href="/"
    })
    let email = document.createTextNode(e);
    document.getElementById('container').appendChild(delBtn);
    document.getElementById('container').appendChild(email);

    // Create todo form
    const text = document.createElement("input");
    text.id = "add-item";
    text.addEventListener("keyup", async (k) => {
        if (k.key !== "Enter")
            return;
        await addTodo(text.value);
        text.value = "";
    });
    document.getElementById('container').appendChild(text);
    // Generate todos
    const todos = await getTodos();
    if (todos) {
        const todoList = document.createElement("ul");
        document.getElementById('container').appendChild(todoList);
        for (t of todos) {
            const li = document.createElement("li");
            li.innerHTML = t;
            todoList.appendChild(li);
        }
    }
}

async function addTodo(text) {
    let arr = [];
    arr.push(text);
    const o = { items: arr }
    // Get token
    const authToken = localStorage.getItem("auth_token");
    if (!authToken) {
        return null;
    }
    try {
        res = await fetch("/api/todos", {
            method: "POST",
            headers: { "authorization": "Bearer " + authToken , "Content-Type": "application/JSON"},
            body: JSON.stringify(o)
        })
        if (res.ok) {
            data = await res.json();
            console.log(data);
            return data.items;
        }
        else {
            return null;
        }
    }
    catch {
        return null;
    }
}

async function getTodos() {
    // Get token
    const authToken = localStorage.getItem("auth_token");
    if (!authToken) {
        return null;
    }
    try {
        res = await fetch("/api/todos", {
            method: "GET",
            headers: { "authorization": "Bearer " + authToken }
        })
        if (res.ok) {
            data = await res.json();
            console.log(data);
            return data.items;
        }
        else {
            return null;
        }
    }
    catch {
        return null;
    }
}



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
    document.getElementById("btn-login").addEventListener("click", loginBtnListener);
    document.getElementById("btn-register").addEventListener("click", registerBtnListener);
}

async function loginBtnListener() {
    const emailField = document.getElementById("email-login");
    const pswField = document.getElementById("password-login");
    if (!emailField.checkValidity() || !pswField.checkValidity()) {
        return;
    }
    const login = await loginUser(emailField.value, pswField.value);
    if (login) {
        emailField.value = "";
        pswField.value = "";
        alert("Success!");
    }
    else {
        alert("User not found");
    }
}

async function registerBtnListener() {
    const emailField = document.getElementById("email-register");
    const pswField = document.getElementById("password-register");
    if (!emailField.checkValidity() || !pswField.checkValidity()) {
        return;
    }
    const registered = await registerUser(emailField.value, pswField.value);
    if (registered) {
        emailField.value = "";
        pswField.value = "";
    }
    else {
        alert("User with the same e-mail already exists.");
    }
}

async function registerUser(email, psw) {
    const object = {
        email: email,
        password: psw
    }
    try {
        const res = await fetch("/api/user/register", {
            method: "post",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(object)
        });
        return res.ok;
    }
    catch {
        return false;
    }
}

async function loginUser(email, psw) {
    const object = {
        email: email,
        password: psw
    }
    try {
        const res = await fetch("/api/user/login", {
            method: "post",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(object)
        });
        return res.ok;
    }
    catch {
        return false;
    }
}
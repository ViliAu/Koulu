if (document.readyState !== "loading") {
    console.log("Document is ready");
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function () {
        console.log("Document ready after waiting!");
        initializeCode();
    })
}

let token = "";

async function initializeCode() {
    document.getElementById("form-register").addEventListener("submit", registerBtnListener);
}

async function registerBtnListener(form) {
    form.preventDefault();
    const emailField = document.getElementById("email-register");
    const pswField = document.getElementById("password-register");
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()-_+={}[\]\|\\;:"<>,.\/\?]).{8,}$/;
    if (!regex.test(pswField.value)) {
        document.getElementById("error").innerHTML = "Password is not strong enough"
        return;
    }
    const registered = await registerUser(emailField.value, pswField.value);
    if (registered) {
        emailField.value = "";
        pswField.value = "";
    }
    else {
        document.getElementById("error").innerHTML = "Email already in use"
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
        const body = await res.json();
        window.location.href = body.url;
    }
    catch {
        return false;
    }
}
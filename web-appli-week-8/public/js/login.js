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
    document.getElementById("form-login").addEventListener("submit", loginBtnListener);
}

async function loginBtnListener(form) {
    form.preventDefault();
    const emailField = document.getElementById("email-login");
    const pswField = document.getElementById("password-login");
    /*if (!emailField.checkValidity() || !pswField.checkValidity()) {
        return;
    }*/
    const login = await loginUser(emailField.value, pswField.value);
    if (login) {
        emailField.value = "";
        pswField.value = "";
    }
    else {
        document.getElementById("error").innerHTML = "Invalid credentials";
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
        body = await res.json();
        if (body.token) {
            localStorage.setItem("auth_token", body.token);
            window.location.href="/";
        }
        console.log(body)
        return res.ok;
    }
    catch(e) {
        
        return false;
    }
}
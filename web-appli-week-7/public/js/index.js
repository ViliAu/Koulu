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

    document.getElementById("btn-register").addEventListener("click", registerBtnListener);
}

async function registerBtnListener() {
    const emailField = document.getElementById("email-register");
    const pswField = document.getElementById("password-register");
    if (!emailField.checkValidity() || !pswField.checkValidity()) {
        return;
    }
    
}
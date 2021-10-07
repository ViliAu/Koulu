const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Thanks bro");
});

router.post("/", (req, res) => {
    res.send("Thanks bro");
    console.log("asd");
});

module.exports = router;
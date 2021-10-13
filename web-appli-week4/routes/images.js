const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Thanks bro");
});

router.post("/", (req, res) => {
    res.send("Thanks bro");
});

module.exports = router;
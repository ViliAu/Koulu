const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require('express-validator');

router.post("/login", async (req, res) => {
    try {
        const result = await User.findOne({email: new RegExp(req.body.email, 'i')});
        if (result) {
            if (await bcrypt.compare(req.body.password, result.password)) {
                res.status(200).send("Login successful")
            }
            else {
                res.status(403).send("Login failed");
            }
        }
        else {
            res.status(404).send("User not found");
        }
    }
    catch(e) {
        res.status(404).send("Login failed");
    }
});

router.post("/register", async (req, res) => {
    try {
        const result = await User.findOne({email: new RegExp(req.body.email, 'i')});
        if (!result) {
            const hash = await bcrypt.hash(req.body.password, 10);
            await new User({
                email: req.body.email,
                password: hash,
            }).save();
            res.status(200).send("User added!");
        }
        else {
            res.status(403).send("There's already a user with the same email");
        }
    }
    catch(e) {
        console.log(e);
        res.status(404).send("Something went wrong");
    }
});

module.exports = router;
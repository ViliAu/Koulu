const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require('express-validator');

router.post("/login",
    body("email").trim().escape().isEmail(),
    body("password").isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()-_+={}[\]\|\\;:"<>,.\/\?]).{8,}$/),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const result = await User.findOne({ email: new RegExp(req.body.email, 'i') });
            if (result) {
                if (await bcrypt.compare(req.body.password, result.password)) {
                    const token = await jwt.sign(
                        {
                            id: result._id,
                            email: result.email
                        },
                        process.env.SECRET,
                        {
                            expiresIn: 120
                        });
                    res.status(200).json({ success: true, token });
                }
                else {
                    res.status(403).send("Incorrect password");
                }
            }
            else {
                res.status(404).send("User not found");
            }
        }
        catch (e) {
            res.status(404).send("Login failed");
            console.log(e);
        }
    });

router.post("/register",
    body("email").trim().escape().isEmail(),
    body("password").isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()-_+={}[\]\|\\;:"<>,.\/\?]).{8,}$/),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const result = await User.findOne({ email: new RegExp(req.body.email, 'i') });
            console.log(req.body.email);
            if (!result) {
                const hash = await bcrypt.hash(req.body.password, 10);
                await new User({
                    email: req.body.email,
                    password: hash,
                }).save();
                res.json({url: "/login.html"});
            }
            else {
                res.status(403).send("There's already a user with the same email");
            }
        }
        catch (e) {
            console.log(e);
            res.status(404).send("Something went wrong");
        }
    });

module.exports = router;
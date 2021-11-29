var express = require('express');
var router = express.Router();
var Book = require('../models/Book');

/* GET home page. */
router.post('/', async (req, res) => {
    try {
        await new Book ({
            name: req.body.name,
            author: req.body.author,
            pages: req.body.pages
        }).save();
        res.status(200).send("Ok")
    }
    catch {
        res.status(400).send("Something went wrong.");
    }
});

module.exports = router;

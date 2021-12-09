var express = require('express');
var router = express.Router();
var Book = require('../models/Book');

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

router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findOne({name: req.params.id});
        console.log(book);
        if (book == null) {
          res.status(404);
        }
        else {
          res.json(book);
        }
    }
    catch(e) {
        res.status(500);
    }
  });

module.exports = router;

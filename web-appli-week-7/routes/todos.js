const express = require("express");
const Todo = require("../models/Todo");
const router = express.Router();
const passport = require("passport");
require('../auth/passport.js')(passport)

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const todo = await Todo.findOne({ id: req.user.id });
        if (todo) {
            for (let o of req.body.items)
                await todo.items.push(o);
            await todo.save();
        }
        else {
            await new Todo ({
                user: req.user._id,
                items: req.body.items
            }).save();
        }
        res.status(200).send("ok");
    }
    catch(e) {
        console.log(e);
        res.status(400).send("Something went wrong")
    }
});

module.exports = router;
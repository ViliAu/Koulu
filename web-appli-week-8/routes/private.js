const express = require("express");
const router = express.Router();
const passport = require("passport");
require('../auth/passport.js')(passport)

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    res.status(200).json({email: req.user.email});
});

module.exports = router;
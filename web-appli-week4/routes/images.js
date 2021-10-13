const express = require("express");
const multer = require("multer");
const upload = multer();
const Image = require("../models/Image");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Thanks bro");
});

router.get("/:imageId", (req, res) => {
    
})

router.post("/", upload.array('images', 12), async (req, res) => {
    let imgArray = [];
    for (let img of req.files) {
        try {
            const dbImg = await new Image({
                name: img.originalname,
                encoding: img.encoding,
                mimetype: img.mimetype,
                buffer: img.buffer
            }).save();
            imgArray.push(dbImg.id)
        }
        catch(e) {
            console.log(e);
        }
    }
    res.json(imgArray);
});

module.exports = router;
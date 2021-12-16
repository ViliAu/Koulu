const express = require('express');
const router = express.Router();

const Post = require('../models/Post');
const Comment = require('../models/Comment');

const passport = require('passport');
require('../auth/passport.js')(passport)
const { body, validationResult } = require('express-validator');

// Returns post previews based on url query string filters
router.get('/preview', async (req, res) => {
    const { author, title } = req.query;

    // Get posts with given data
    try {
        let postArray = [];
        let postObjects = [];
        if (author) {
            postArray = await Post.find({ author: author }, '_id title text author ratings lastEdited').sort({ lastEdited: 'desc' }).exec();
        }
        else if (title) {
            postArray = await Post.find({ title: new RegExp(title, 'i') }, '_id title text author ratings lastEdited').sort({ lastEdited: 'desc' }).exec();
        }
        else {
            postArray = await Post.find({}, '_id title text author ratings lastEdited').sort({ lastEdited: 'desc' }).exec();
        }
        for (post of postArray) {
            let rating = 0;
            for (let like of post.ratings) {
                rating += like.rating;
            }
            postObjects.push({
                id: post._id,
                title: post.title,
                text: post.text,
                author: post.author,
                likes: rating,
                lastEdited: post.lastEdited
            })
        }
        res.status(200).json({ success: true, previews: postObjects });
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ success: false, error: "Something went wrong" });
    }

});

// Returns a post with all comments to the client
router.get('/postdata', async (req, res) => {
    const { id } = req.query;
    try {
        // Fetch post and fetch all comments
        const post = await Post.findById(id).exec();
        let fetchedComments = [];

        // Get all comments
        for (comment of post.comments) {
            const commentObj = await Comment.findById(comment._id).exec();
            // Check if comment exists
            if (!commentObj) {
                continue;
            }
            fetchedComments.push(commentObj)
        }
        let rating = 0;
        for (like of post.ratings) {
            rating += like.rating;
        }
        res.status(200).send({ success: true, post: post, comments: fetchedComments, rating: rating });
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ success: false, error: "Something went wrong" });
    }
});

router.post('/',
    body('title').trim().isLength({ min: 1, max: 50 }).escape(),
    body('text').isLength({ min: 1 }).escape(),
    passport.authenticate('jwt', { session: false }), async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, error: "Post title and body cannot be empty." });
        }
        try {
            const newPost = await new Post({
                title: req.body.title,
                text: req.body.text,
                code: req.body.code,
                author: req.user.id,
            }).save();
            res.status(200).json({ success: true, id: newPost._id });
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ success: false, error: "Something went wrong!" });
        }
    });

router.delete('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { id } = req.query;
    try {
        let post = await Post.findById(id).exec();
        if (post) {
            // Check authorization
            if (!req.user.admin && !post.author.equals(req.user._id)) {
                return res.status(401).send({ success: false, error: "Unauthorized" });
            }
            for (comment of post.comments) {
                await Comment.findByIdAndDelete(comment._id).exec();
            }
            await Post.findByIdAndDelete(id).exec();
            return res.status(200).json({success: true});
        }  
        else {
            post = await Comment.findById(id).exec();
            if (post) {
                // Check authorization
                if (!req.user.admin && !post.author.equals(req.user._id)) {
                    return res.status(401).send({ success: false, error: "Unauthorized" });
                }
                await Comment.findByIdAndDelete(id).exec();
                return res.status(200).json({success: true});
            }
            else {
                return res.status(404).json({success: false, error: "Couldn't find post"});
            }
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ success: false, error: "Something went wrong!" });
    }

});

// Adds a comment to the database and links it to the post
router.post('/comment',
    body('title').trim().isLength({ min: 1, max: 50 }).escape(),
    body('text').isLength({ min: 1 }).escape(),
    passport.authenticate('jwt', { session: false }), async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, error: "Post title and body cannot be empty." });
        }
        try {
            // First try to see if the post still exists
            const post = await Post.findById(req.body.id).exec();
            if (post) {
                const newComment = await new Comment({
                    title: req.body.title,
                    text: req.body.text,
                    author: req.user.id,
                }).save();
                await post.comments.push(newComment._id);
                await post.save();
                res.status(200).json({ success: true, id: newComment._id });
            }
            else {
                res.status(400).json({ success: false, error: "Post not found or doesn't exist anymore!" });
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ success: false, error: "Something went wrong!" });
        }
    });

// Adds a ratings to a post or a comment
router.put('/rate', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { id } = req.query;
    if (req.body.rating === null || req.body.rating < -1 || req.body.rating > 1) {
        return res.status(400).json({ success: false, error: "Bad request" });
    }
    try {
        let post = await Post.findById(id).exec();
        if (post) {
            // Clear previous ratings and update with the new one
            await Post.findByIdAndUpdate(id, { $pull: { ratings: { author: req.user._id } } }).exec();
            await Post.findByIdAndUpdate(id, { $push: { ratings: { author: req.user._id, rating: req.body.rating } } }).exec();
            res.status(200).json({ success: true });
        }
        else {
            post = await Comment.findById(id).exec();
            if (post) {
                // Clear previous ratings and update with the new one
                await Comment.findByIdAndUpdate(id, { $pull: { ratings: { author: req.user._id } } }).exec();
                await Comment.findByIdAndUpdate(id, { $push: { ratings: { author: req.user._id, rating: req.body.rating } } }).exec();
                res.status(200).json({ success: true });
            }
            else {
                res.status(400).json({ success: false, error: "Post not found or doesn't exist anymore!" });
            }
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ success: false, error: "Something went wrong!" });
    }
});

router.patch('/edit',
    body('title').trim().isLength({ min: 1, max: 50 }).escape(),
    body('text').isLength({ min: 1 }).escape(),
    passport.authenticate('jwt', { session: false }), async (req, res) => {
        const { id } = req.query;

        // Validate form
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, error: "Post title and body cannot be empty." });
        }

        try {
            // Try to find the edited post
            let post = await Post.findById(id);
            const date = new Date().toISOString();
            if (post) {
                // Check authorization
                if (!req.user.admin && !post.author.equals(req.user._id)) {
                    return res.status(401).send({ success: false, error: "Unauthorized" });
                }
                else {
                    await Post.findByIdAndUpdate(id, {
                        title: req.body.title,
                        text: req.body.text,
                        code: req.body.code,
                        lastEdited: date
                    }).exec();
                    res.json({ success: true });
                }
            }
            else {
                post = await Comment.findById(id);
                if (post) {
                    // Check authorization
                    if (!req.user.admin && !post.author.equals(req.user._id)) {
                        return res.status(401).send({ success: false, error: "Unauthorized" });
                    }
                    else {
                        await Comment.findByIdAndUpdate(id, {
                            title: req.body.title,
                            text: req.body.text,
                            lastEdited: date
                        }).exec();
                        res.json({ success: true });
                    }
                }
                else {
                    return res.status(404).send({ success: false, error: "Post not found" });
                }
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ success: false, error: "Something went wrong!" });
        }
    });

router.get('/amount', async (req, res) => {
    try {
        const p = await Post.find({});
        res.status(200).json({amount: p.length});
    }
    catch {
        res.status(500).json({ success: false, error: "Something went wrong!" });
    }
});

module.exports = router;
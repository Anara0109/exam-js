const express = require("express");
const { PostModel } = require("../Models");
const router = express.Router();

router.get("/", (req, res) => {
    PostModel.find({}, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    PostModel.find(id, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});


router.post("/", (req, res) => {
    const { email, title, post } = req.body;
    const newPost = new PostModel({ email, title, post, like: 0 });
    newPost.save((err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send("Added new post");
        }
    });
});
router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const { title, post } = req.body;
    await PostModel.findByIdAndUpdate(id, { title, post }
    );
    res.send("ok")
})

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    PostModel.findByIdAndDelete(id, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send("deleted");
        }
    });
});
router.get("/like/:id", async (req, res) => {
    const postId = req.params.id
    const post = await PostModel.findById(postId);
    await PostModel.findByIdAndUpdate(postId,{like: post.like +1 })
    res.status(201).send("Ok");
});

router.get("/unlike/:id", async (req, res) => {
    const postId = req.params.id
    const post = await PostModel.findById(postId);
    await PostModel.findByIdAndUpdate(postId,{like: post.like - 1})
    res.status(201).send("Ok");
});

module.exports = router
const express = require("express");
const { AccountModel, PostModel } = require("../Models");
const router = express.Router();

router.get("/", (req, res) => {
    AccountModel.find({}, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(results);
        }
    });
});
router.get("/:id", (req, res) => {
    const id = req.params.id;
    AccountModel.findById(id, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(results);
        }
    });
});

router.post("/check", async (req, res) => {
    const { email, password, name, surname, age } = req.body;
    const acc = await AccountModel.findOne({ email });
    if (acc) {
        return res.status(400).send("Пользователь с таким именем уже существует" );
    }else {
    const newAccount = new AccountModel({ email, password, name, surname, age });
    newAccount.save((err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send("Added new account")
        }
    });
}
});
router.post("/", (req, res) => {
    const { email, password, name, surname, age } = req.body;
    const newAccount = new AccountModel({ email, password, name, surname, age, posts: [] });
    newAccount.save((err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send("Added new account")
        }
    });
});

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const { name, surname, age } = req.body;
    AccountModel.findByIdAndUpdate(id, { name, surname, age }, (err) =>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send("ok")

        }
    });
})

// router.put("/newPost", async  (req, res) => {
//     const { userId, postId } = req.body;
//     const user = await AccountModel.findById(userId);
//     const newPost = await PostModel.findById(postId);

    
//     user.posts.push(newPost);

//     car.save((err) => {
//         if(err){
//             res.status(500).send(err);
//         }else {
//             res.status(201).send("updated")
//         }
//     });
// });
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    AccountModel.findByIdAndDelete(id, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send("deleted");
        }
    })
});

router.put("/follow/:id", async (req, res) => {
    const id = req.params.id;
    const { newData } = req.body
    const user = await AccountModel.findById(id)
    const newFollowers = user.follows
    newFollowers.push(newData)
    await AccountModel.findByIdAndUpdate(id, {follows: newFollowers});
    res.status(201).send("ok")
})

router.put("/unfollow/:id", async (req, res) => {
    const id = req.params.id;
    const { newData } = req.body
    const user = await AccountModel.findById(id)
    const newFollowers = user.follows
    const index = newFollowers.indexOf(newData)
    newFollowers.splice(index, 1)
    await AccountModel.findByIdAndUpdate(id, {followers: newFollowers});
    res.status(201).send("ok")
})
module.exports = router
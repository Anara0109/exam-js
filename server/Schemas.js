const { Schema } = require("mongoose");

const PostSchema = new Schema({
    email: String,
    title: String,
    post: String,
    like: Number,
    date: {
        type: Date,
        default: Date.now
    },
});
const AccountSchema = new Schema({
    email: String,
    password: String,
    name: String,
    surname: String,
    age: Number,
    posts: [PostSchema],
    follows: []
});


module.exports = {
    AccountSchema,
    PostSchema,
};
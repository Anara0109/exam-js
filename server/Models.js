const mongoose = require("mongoose");
const { AccountSchema, PostSchema } = require("./Schemas.js");

const AccountModel = mongoose.model("Account", AccountSchema);
const PostModel = mongoose.model("Post", PostSchema);


module.exports = {
    PostModel,
    AccountModel,
   
}

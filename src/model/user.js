const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstNmae: {
        type: String
    },
    lastName: {
        tupe: String       
    },
    emailId: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        tupe: Number
    },
    gendor: {
        type: String
    },
}
)

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
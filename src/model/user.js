const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validator(value) {
            if (validator.isEmail(value)) {
                throw new Error("Invalid email address: " + vlaue);
            }
        }
    },
    password: {
        type: String,
        required: true,
        validator(value) {
            if (!Validator.password(value)) {
                throw new Error("Please enter a strong password:" + vlaue);
            }
        }
    },
    age: {
        type: Number,
        min: 18,
        max: 50,
    },
    gendor: {
        type: String,
        validater(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is not valid");
            }
        }
    },
    photoUrl: {
        type: String,
        defalut: "https://geographyandyou.image/user-profile.com",
        validator(value) {
            if (!Validator.isURL(value)) {
                throw new Error("Invalid Photo URL:" + vlaue);
            }
        }
    },
    about: {
        type: String,
        default: "This is a default about of the user!",
    },
    skills: {
        type: [String],
    }
},
    {
        timestamps: true,
    }
)

userSchema.method.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({ _id: user._Id }, "DEV@7meetup", { expiresIn: '1d' });

    return token;
}
const user = mongoose.model("user", userSchema);

module.exports = { user };
const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.connect("")
}

connectDB()
    .then(() => {
        console.log("Database connection established");
    })
    .catch(() => {
        console.log("Database cannot be connected!!");
    })
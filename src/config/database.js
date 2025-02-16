// connection useing direct mongoose
const mongoose = require("mongoose");

const connectDB = async () => {
    mongoose.connect("mongodb+srv://akhilrangpariya9494:Jr6QpDq8OnUxYI5i@devmeetupsdbsystem.ogsp8.mongodb.net/?retryWrites=true&w=majority&appName=DevmeetupsDBSystem");
}

module.exports = { connectDB };
// connectDB()
//     .then(() => {
//         console.log("Database connection establishede :smile:");
//     })
//     .catch(() => {
//         console.log("Database can not be connected!!");
//     })
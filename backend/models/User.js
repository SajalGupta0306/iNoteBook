const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
  });

const user = mongoose.model("users", userSchema);
// ensures unique records based on the property which is defined unique
// user.createIndexes();
module.exports = user;
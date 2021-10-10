const mongoose = require("mongoose");
const mongoDBURI = "mongodb://127.0.0.1:27017/inotebook?readPreference=primary&serverSelectionTimeoutMS=2000&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const connectToMongo = () => {
    mongoose.connect(mongoDBURI, () => {
        console.log("Connection Success");
    })
}

module.exports = connectToMongo;
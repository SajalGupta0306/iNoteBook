const mongoose = require("mongoose");
const { Schema } = mongoose;

const notesSchema = new Schema({
  // user is referenced as a foriegn key to store used specific notes only
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tag: { type: String, default: "General" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("notes", notesSchema);

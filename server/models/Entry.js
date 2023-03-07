const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  prompt: String,
  tags: [String],
});

module.exports = mongoose.model("Entry", entrySchema);

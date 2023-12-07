const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title name is required"],
    },
    note: {
      type: String,
      required: [true, "Note price is required"],
    },
    category: {
      type: String,
      required: [true, "Note category is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);

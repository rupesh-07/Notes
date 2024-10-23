const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    category: {
      type: String,
      enum: ["Personal", "Work", "Other"],
      default: "Other",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "notes-data",
    versionKey: false,
  }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;

const Note = require("../models/noteModel");

// Create a new note
const createNote = async (req, res) => {
  try {
    const { text, category } = req.body;
    const newNote = new Note({ text, category });
    await newNote.save();
    res.status(201).json({ message: "Note created successfully", newNote });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all notes
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json({ message: "Notes retrieved successfully",count: notes.length, notes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single note by ID
const getSingleNote = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findById(id);
    res.status(200).json({ message: "Note retrieved successfully", note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a note by ID
const updateNote = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ message: "Note updated successfully", updatedNote });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a note by ID
const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNote = await Note.findByIdAndDelete(id);
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNote,
  getAllNotes,
  getSingleNote,
  updateNote,
  deleteNote,
};

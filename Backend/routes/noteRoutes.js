const express = require("express");
const router = express.Router();

const {
  createNote,
  getAllNotes,
  getSingleNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteControlles");

// Routes
router.post("/", createNote);
router.get("/", getAllNotes);
router.get("/:id", getSingleNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

module.exports = router;

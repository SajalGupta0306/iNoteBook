const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// ROUTE 1: fetch all notes of a particular user based on the auth token : endpoint: /api/note/fetchAllNotes
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    var allNotes = await Notes.find({
      user: req.user.id,
    });
    if (!allNotes) {
      return res.status(404).json({
        error: "No notes available for the user",
      });
    }
    res.json(allNotes);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(`Oops. Error found: ${err.message}`);
  }
});

// ROUTE 2: Add a new note of a particular logged in user based on the auth token : endpoint: /api/note/addNote
router.post(
  "/addNote",
  fetchUser,
  [
    body("title", "Title must be atleast 3 characters").isLength({
      min: 3,
    }),
    body("description", "Description must be atleast 7 characters").isLength({
      min: 7,
    }),
    body("tag", "A note cannot be saved without a tag").exists(),
    body("tag", "A note cannot be saved without a tag").isLength({
      min: 1,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { title, description, tag } = req.body;
    try {
      const newNote = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const addedNote = await newNote.save();
      res.json(addedNote);
    } catch (err) {
      console.error(err.message);
      res.status(500).json(`Oops. Error found: ${err.message}`);
    }
  }
);

// ROUTE 3: Update a particular note of a particular logged in user based on the auth token : endpoint: /api/note/updateNote
router.put(
  "/updateNote/:id",
  fetchUser,
  [
    body("title", "Title must be atleast 3 characters").isLength({
      min: 3,
    }),
    body("description", "Description must be atleast 7 characters").isLength({
      min: 7,
    }),
    body("tag", "A note cannot be updated without a tag").exists(),
    body("tag", "A note cannot be updated without a tag").isLength({
      min: 1,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { title, description, tag } = req.body;
    try {
      const updatedNote = {};
      // if(title){
      updatedNote.title = title;
      // }
      // if(description){
      updatedNote.description = description;
      // }
      // if(tag){
      updatedNote.tag = tag;
      // }
      // finding a note based on id and checking if it exists or not
      const noteToUpdate = await Notes.findById(req.params.id);
      if (!noteToUpdate) {
        return res.status(400).json("Note not found. Please check.");
      }
      // ensure that the logged in user is only updating the note and no other user is doing
      if (noteToUpdate.user.toString() !== req.user.id) {
        return res.status(401).json("Incorrect user. Please check.");
      }

      // updated the note based on the id passed
      const note = await Notes.findByIdAndUpdate(req.params.id, updatedNote, {
        new: true,
      });
      res.json(note);
    } catch (err) {
      console.error(err.message);
      res.status(500).json(`Oops. Error found: ${err.message}`);
    }
  }
);


// ROUTE 4: Delete a particular note of a particular logged in user based on the auth token : endpoint: /api/note/deleteNote
router.delete(
  "/deleteNote/:id",
  fetchUser,
  async (req, res) => {
    try {
      const noteById = await Notes.findById(req.params.id);
      if (!noteById) {
        return res.status(400).json("Note not found. Please check.");
      }
      // ensure that the logged in user is only deleting the note and no other user is doing
      if (noteById.user.toString() !== req.user.id) {
        return res.status(401).json("Incorrect user. Please check.");
      }
      const deletedNote = await Notes.findByIdAndDelete(req.params.id);
      res.json(deletedNote);
    } catch (err) {
      console.error(err.message);
      res.status(500).json(`Oops. Error found: ${err.message}`);
    }
  }
);

module.exports = router;

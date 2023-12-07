const express = require("express");

const {
  createNote,
  getAllNotes,
  getSingleNote,
  updateNote,
  deleteNote,
} = require("../controllers/notes");
const router = express.Router();

// GET /products --> get all products
router.get("/", getAllNotes);

// GET /products/:id --> get single product
router.get("/", getSingleNote);

// POST /products --> create a new product
router.post("/", createNote);

// PUT /products/:id --> update a product
router.put("/", updateNote);

// DELETE /products/:id --> delete a product
router.delete("/", deleteNote);

module.exports = router;

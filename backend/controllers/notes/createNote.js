const Note = require("../../models/note");
const createNote = async (req, res) => {
  const { title, note, category } = req.body;
  try {
    if (!title || !note || !category) {
      return res.status(400).json({
        message: "All fields are required",
      });
    } else {
      const note = await Note.create({
        title,
        note,
        category,
      });
      res.status(201).json({ note });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
module.exports = {
  createNote,
};

const Note = require("../../models/note");

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({});
    if (!notes || notes.length === 0) {
      return res.status(404).json({ message: "Notes not found" });
    }

    res.status(200).json({ notes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getAllNotes };

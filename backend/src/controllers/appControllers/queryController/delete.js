const mongoose = require('mongoose');
const Query = mongoose.model('Query');

const deleteNoteFromQuery = async (req, res) => {
  const { id, noteId } = req.params;

  try {
    const query = await Query.findById(id);
    if (!query) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'Query not found',
      });
    }

    const noteIndex = query.notes.findIndex((note) => note._id.toString() === noteId);

    if (noteIndex === -1) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'Note not found',
      });
    }

    query.notes.splice(noteIndex, 1);
    const updatedQuery = await query.save();

    return res.status(200).json({
      success: true,
      result: updatedQuery,
      message: 'Note deleted successfully',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      result: null,
      message: 'Failed to delete note',
    });
  }
};

module.exports = deleteNoteFromQuery;

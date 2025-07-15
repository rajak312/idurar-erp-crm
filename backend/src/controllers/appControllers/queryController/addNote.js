const mongoose = require('mongoose');
const Query = mongoose.model('Query');
const Joi = require('joi');

const noteSchema = Joi.object({
  content: Joi.string().required(),
});

const addNoteToQuery = async (req, res) => {
  const { id } = req.params;
  const { error, value } = noteSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      result: null,
      message: error.details[0].message,
    });
  }

  try {
    const query = await Query.findById(id);
    if (!query) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'Query not found',
      });
    }

    const note = {
      content: value.content,
      createdAt: new Date(),
    };

    query.notes.push(note);
    const updatedQuery = await query.save();

    return res.status(201).json({
      success: true,
      result: updatedQuery,
      message: 'Note added successfully',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      result: null,
      message: 'Failed to add note',
    });
  }
};

module.exports = addNoteToQuery;

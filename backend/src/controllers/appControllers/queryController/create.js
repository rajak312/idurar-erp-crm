const mongoose = require('mongoose');
const Model = mongoose.model('Query');

const createQuery = async (req, res) => {
  const { customerId, description, status = 'Open', resolution = '', notes = [] } = req.body;

  if (!description) {
    return res.status(400).json({
      success: false,
      message: ' description are required',
    });
  }

  const formattedNotes = notes.map((note) => ({
    content: note.content,
    createdAt: note.createdAt || new Date(),
  }));

  const query = new Model({
    customerId,
    description,
    status,
    resolution,
    notes: formattedNotes,
  });

  const savedQuery = await query.save();

  return res.status(201).json({
    success: true,
    result: savedQuery,
    message: 'Query created successfully',
  });
};

module.exports = createQuery;

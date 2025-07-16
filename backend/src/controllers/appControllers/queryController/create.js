const mongoose = require('mongoose');
const Model = mongoose.model('Query');

const createQuery = async (req, res) => {
  const { description, status = 'Open', resolution = '', notes = [] } = req.body;
  const createdBy = req.admin?._id || req.client?._id;
  const createdByModel = req.admin ? 'Admin' : 'Client';
  const name = req.admin?.name || req.client?.name;

  if (!description || !createdBy || !name) {
    return res.status(400).json({
      success: false,
      message: 'Description and creator identity are required.',
    });
  }

  const formattedNotes = notes.map((note) => ({
    content: note.content,
    createdAt: note.createdAt || new Date(),
  }));

  const query = new Model({
    description,
    status,
    resolution,
    notes: formattedNotes,
    createdBy,
    createdByModel,
    name,
  });

  const savedQuery = await query.save();

  return res.status(201).json({
    success: true,
    result: savedQuery,
    message: 'Query created successfully',
  });
};

module.exports = createQuery;

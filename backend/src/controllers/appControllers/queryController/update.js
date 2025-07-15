const mongoose = require('mongoose');
const Query = mongoose.model('Query');
const queryUpdateSchema = require('./schemaValidate');

const updateQuery = async (req, res) => {
  const { id } = req.params;
  const { error, value } = queryUpdateSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      result: null,
      message: error.details[0].message,
    });
  }

  try {
    const existingQuery = await Query.findById(id);
    if (!existingQuery) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'Query not found',
      });
    }

    const updateFields = value;

    if (updateFields.notes) {
      existingQuery.notes.push(...updateFields.notes);
      delete updateFields.notes;
    }

    Object.assign(existingQuery, updateFields);
    const updatedQuery = await existingQuery.save();

    return res.status(200).json({
      success: true,
      result: updatedQuery,
      message: 'Query updated successfully',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      result: null,
      message: 'Something went wrong',
    });
  }
};

module.exports = updateQuery;

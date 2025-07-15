const mongoose = require('mongoose');
const Model = mongoose.model('Query');

const read = async (req, res) => {
  try {
    const result = await Model.findOne({ _id: req.params.id }).exec();

    if (!result) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'No document found',
      });
    }

    res.status(200).json({
      success: true,
      result,
      message: 'We found this document',
    });
  } catch (error) {
    console.error('Read error:', error);
    res.status(500).json({
      success: false,
      result: null,
      message: 'Server error',
      controller: 'read',
      error,
    });
  }
};

module.exports = read;

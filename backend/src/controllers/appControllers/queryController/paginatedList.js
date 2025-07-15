const mongoose = require('mongoose');
const Model = mongoose.model('Query');

const paginatedList = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.items) || 10;
  const skip = (page - 1) * limit;

  const { sortBy = 'createdAt', sortValue = -1, filter, equal, q, fields } = req.query;

  const queryFilter = {};

  if (filter && equal) {
    queryFilter[filter] = equal;
  }

  if (q && fields) {
    const fieldList = fields.split(',').map((field) => ({
      [field]: { $regex: new RegExp(q, 'i') },
    }));
    if (fieldList.length > 0) {
      queryFilter.$or = fieldList;
    }
  }

  try {
    const [result, count] = await Promise.all([
      Model.find(queryFilter)
        .sort({ [sortBy]: sortValue })
        .skip(skip)
        .limit(limit),
      Model.countDocuments(queryFilter),
    ]);

    const totalPages = Math.ceil(count / limit);
    const pagination = { page, totalPages, count };

    if (count > 0) {
      return res.status(200).json({
        success: true,
        result,
        pagination,
        message: 'Successfully found all queries',
      });
    } else {
      return res.status(203).json({
        success: true,
        result: [],
        pagination,
        message: 'No queries found',
      });
    }
  } catch (error) {
    console.error('Query pagination error:', error);
    return res.status(500).json({
      success: false,
      result: null,
      message: 'Internal server error',
      controller: 'paginatedList',
      error,
    });
  }
};

module.exports = paginatedList;

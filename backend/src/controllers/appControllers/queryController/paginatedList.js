const mongoose = require('mongoose');
const Model = mongoose.model('Query');

const paginatedList = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {};
  if (req.query.status) {
    filter.status = req.query.status;
  }

  try {
    const [queries, total] = await Promise.all([
      Model.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Model.countDocuments(filter),
    ]);

    res.status(200).json({
      queries,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Pagination error:', error);
    res.status(500).json({
      success: false,
      result: null,
      message: 'Internal server error',
      controller: 'paginatedList',
      error,
    });
  }
};

module.exports = paginatedList;

const mongoose = require('mongoose');
const Model = mongoose.model('Query');

const getAllNotes = async (req, res) => {
  const { id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.items) || 10;
  const skip = (page - 1) * limit;
  const { sortBy = 'createdAt', sortValue = -1, q } = req.query;

  const matchStage = {
    _id: new mongoose.Types.ObjectId(id),
  };

  try {
    const pipeline = [
      { $match: matchStage },
      { $unwind: '$notes' },
      ...(q
        ? [
            {
              $match: {
                'notes.content': { $regex: new RegExp(q, 'i') },
              },
            },
          ]
        : []),
      {
        $project: {
          _id: '$notes._id',
          queryId: '$_id',
          content: '$notes.content',
          createdAt: '$notes.createdAt',
        },
      },
      { $sort: { [sortBy]: parseInt(sortValue) } },
      { $skip: skip },
      { $limit: limit },
    ];

    const countPipeline = [
      { $match: matchStage },
      { $unwind: '$notes' },
      ...(q
        ? [
            {
              $match: {
                'notes.content': { $regex: new RegExp(q, 'i') },
              },
            },
          ]
        : []),
      { $count: 'total' },
    ];

    const [result, countResult] = await Promise.all([
      Model.aggregate(pipeline),
      Model.aggregate(countPipeline),
    ]);

    const count = countResult[0]?.total || 0;
    const totalPages = Math.ceil(count / limit);
    const pagination = { page, totalPages, count };

    return res.status(200).json({
      success: true,
      result,
      pagination,
      message: 'Successfully fetched notes for the query',
    });
  } catch (error) {
    console.error('Error fetching query notes:', error);
    return res.status(500).json({
      success: false,
      result: null,
      message: 'Internal server error',
      controller: 'getAllNotes',
      error,
    });
  }
};

module.exports = getAllNotes;

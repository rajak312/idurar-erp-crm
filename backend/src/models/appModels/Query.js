const mongoose = require('mongoose');
const NoteSchema = new mongoose.Schema(
  {
    content: String,
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const QuerySchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    status: { type: String, enum: ['Open', 'InProgress', 'Closed'], default: 'Open' },
    resolution: { type: String },
    notes: [NoteSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Query', QuerySchema);

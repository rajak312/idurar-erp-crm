const mongoose = require('mongoose');
const generate = require('@/utils/generateMessage');

const generateSummary = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid invoice ID.',
      });
    }

    const Invoice = mongoose.model('Invoice');
    const invoice = await Invoice.findById(id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found.',
      });
    }

    const notes = invoice.items
      .filter((item) => item.note && item.note.trim() !== '')
      .map((item) => item.note.trim());

    if (notes.length === 0) {
      invoice.summary = '';
      await invoice.save();
      return res.status(200).json({
        success: true,
        message: 'No notes found. Empty summary saved.',
        result: '',
      });
    }

    const prompt = `Summarize the following invoice item notes into a single short paragraph:\n\n${notes.join(
      '\n- '
    )}`;

    const summary = await generate(prompt);

    invoice.summary = summary;
    const doc = await invoice.save();

    return res.status(200).json({
      success: true,
      message: 'Summary generated and saved successfully.',
      result: summary,
    });
  } catch (error) {
    console.error('Summary Generation Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate summary.',
      error: error.message,
    });
  }
};

module.exports = generateSummary;

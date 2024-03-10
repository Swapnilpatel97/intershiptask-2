const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Income', incomeSchema);

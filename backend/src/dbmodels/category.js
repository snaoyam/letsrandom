const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  noitems: {
    type: Number,
    default: 0
  },
  picked: {
    type: Number,
    default: 0
  },
  report: {
      type: Number,
      default: 0
  },
}, { timestamps: true });

const CateModel = mongoose.model("category", schema);

module.exports = CateModel;
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
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

const ItemModel = mongoose.model("item", schema);

module.exports = ItemModel;
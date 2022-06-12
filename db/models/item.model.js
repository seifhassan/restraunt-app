const mongoose = require("mongoose");

const itemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
      require: false,
    },
    categories: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);
itemSchema.methods.toJSON = function () {
  return this.toObject();
};

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;

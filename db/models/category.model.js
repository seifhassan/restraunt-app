const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    // title: {
    //   type: String,
    //   required: true,
    // },
    description: {
      type: String,
      require: true,
    },
    categoryImage: {
      type: String,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
  },
  { timestamps: true }
);
categorySchema.methods.toJSON = function () {
  return this.toObject();
};

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;

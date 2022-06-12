const categoryModel = require("../../db/models/category.model");
class Category {
  static addCategory = async (req, res) => {
    try {
      const data = new categoryModel(req.body);
      await data.save();
      res.status(200).send({
        apiStatus: true,
        data: data,
        message: "Added",
      });
    } catch (e) {
      res.status(400).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };
  static allCategories = async (req, res) => {
    try {
      const categories = await categoryModel.find();
      res.status(200).send({
        apiStatus: true,
        data: categories,
        message: "All Categories",
      });
    } catch (e) {
      res.status(400).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };
  static singleCategory = async (req, res) => {
    try {
      const category = await categoryModel.findById(req.params.id);
      res.status(200).send({
        apiStatus: true,
        data: category,
        message: "Single Category",
      });
    } catch (e) {
      res.status(400).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };
  static editCategory = async (req, res) => {
    try {
      const category = await categoryModel.findByIdAndUpdate(
        req.params.id,
        req.body,

        { runValidators: true, new: true }
      );
      res.status(200).send({
        apiStatus: true,
        data: category,
        messgae: "Edit Category",
      });
    } catch (e) {
      res.status(400).send({
        apiStatus: false,
        data: e,
        messgae: e.message,
      });
    }
  };
  static deleteCategory = async (req, res) => {
    try {
      const category = await categoryModel.findByIdAndDelete(req.params.id);
      res.status(200).send({
        apiStatus: true,
        data: category,
        message: "Delete Category",
      });
    } catch (e) {
      res.status(400).send({
        apiStatus: false,
        message: e.message,
      });
    }
  };
  static uploadImage = async (req, res) => {
    req.body.categoryImage = `${req.file.path}`;
    const category = await new categoryModel(req.body);
    // console.log("req.body :: ", category);
    // console.log("req.file :: ", req.file);
    await category.save();
    res.status(200).send({
      category: category,
    });
  };
  static itemsPerCategory = async (req, res) => {
    try {
      const category = await categoryModel
        .findById(req.params.id)
        .populate("items");
      console.log(category);
      res.status(200).send({
        apiStatus: true,
        data: category.items,
        message: "Items per catgory",
      });
    } catch (e) {
      res.status(400).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };
}

module.exports = Category;

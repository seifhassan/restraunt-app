const itemModel = require("../../db/models/item.model");
const categoryModel = require("../../db/models/category.model");
class Item {
  static addItem = async (req, res) => {
    try {
      console.log(req.params);
      const data = new itemModel(req.body);
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
  static allItems = async (req, res) => {
    try {
      const items = await itemModel.find();
      res.status(200).send({
        apiStatus: true,
        data: items,
        message: "All Items",
      });
    } catch (e) {
      res.status(400).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };
  static singleItem = async (req, res) => {
    try {
      const item = await itemModel.findById(req.params.id);
      res.status(200).send({
        apiStatus: true,
        data: item,
        message: "Single Item",
      });
    } catch (e) {
      res.status(400).send({
        apiStatus: false,
        data: e,
        message: e.message,
      });
    }
  };
  static editItem = async (req, res) => {
    try {
      const item = await itemModel.findByIdAndUpdate(
        req.params.id,
        req.body,

        { runValidators: true, new: true }
      );
      res.status(200).send({
        apiStatus: true,
        data: item,
        messgae: "Edit Item",
      });
    } catch (e) {
      res.status(400).send({
        apiStatus: false,
        data: e,
        messgae: e.message,
      });
    }
  };
  static deleteItem = async (req, res) => {
    try {
      const item = await itemModel.findByIdAndDelete(req.params.id);
      res.status(200).send({
        apiStatus: true,
        data: item,
        message: "Delete Item",
      });
    } catch (e) {
      res.status(400).send({
        apiStatus: false,
        message: e.message,
      });
    }
  };
  static addItemToCategory = async (req, res) => {
    const category = await categoryModel.findById(req.params.id);
    console.log(req.body);
    const items = new itemModel(req.body);
    console.log(items);
    await items.save();
    category.items.push(items);
    console.log(category);
    await category.save();
    res.send(category);
  };
  static categorybyItems = async (req, res) => {
    // const category = await categoryModel.findById(req.params.id);
    // const categoryByItems = await itemModel
    //   .findById(req.params.id)
    //   .populate("categories");
    // console.log(categoryByItems);
    // res.send(categoryByItems);
    const items = await itemModel.find({ categories: req.params.id });
    res.send({ items });
  };
}

module.exports = Item;

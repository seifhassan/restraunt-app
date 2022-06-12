const router = require("express").Router();
const Category = require("../app/controllers/category.controller");
const multer = require("multer");
const uploadFile = require("../app/middlewares/uploadFiles");
const auth = require("../app/middlewares/auth");

router.post("/", auth, Category.addCategory);
router.get("/:id", Category.singleCategory);
router.post("/items/:id", Category.itemsPerCategory);
router.get("/", Category.allCategories);
router.put("/:id", auth, Category.editCategory);
router.delete("/:id", auth, Category.deleteCategory);
router.post("/catImg", auth, uploadFile.single("catImg"), Category.uploadImage);

module.exports = router;

const router = require("express").Router();
const Item = require("../app/controllers/item.controller");

router.post("/", Item.addItem);
router.get("/:id", Item.singleItem);
router.post("/category/:id", Item.addItemToCategory);
router.post("/populate/:id", Item.categorybyItems);
router.get("/", Item.allItems);
router.put("/:id", Item.editItem);
router.delete("/:id", Item.deleteItem);

module.exports = router;

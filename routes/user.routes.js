const router = require("express").Router();
const auth = require("../app/middlewares/auth");
const User = require("../app/controllers/user.controller");
router.post("/register", auth, User.register);
router.post("/login", User.login);
router.get("/all", auth, User.showAll);
router.get("/logout", auth, User.logout);
router.delete("/deleteMe", auth, User.deleteMe);
router.put("/editUser", auth, User.edit);
router.get("/findUser", auth, User.getUser);
router.put("/changePass", auth, User.changePassword);

module.exports = router;

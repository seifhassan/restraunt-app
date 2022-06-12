const userModle = require("../../db/models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const sendmail = require("../helpers/sendEmail");
const validator = require("validator");
class User {
  static register = async (req, res) => {
    try {
      const user = new userModle(req.body);
      // console.log(user)
      // user.password=await bcryptjs.hash(user.password,15)
      await user.save();
      // sendmail(user.email)
      res.status(200).send({
        apiStatus: true,
        data: user,
        message: "registered",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e,
        message: "not registerd",
      });
    }
  };
  static login = async (req, res) => {
    try {
      // const start=new Date();
      const email = req.body.email;
      const user = await userModle.findOne({ email });
      const match = await bcryptjs.compare(req.body.password, user.password);
      if (!match) throw new Error("invalid email or password");
      const token = jwt.sign({ _id: user._id }, "12");
      user.tokens = user.tokens.concat({ token });
      await user.save();
      // const end=new Date()-start
      res.status(200).send({
        apiStatus: true,
        data: { user, token },
        message: "logged in",
        // responseT:end
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e.message,
        message: " invalid login",
        // responseT:end
      });
    }
  };
  static showAll = async (req, res) => {
    try {
      const users = await userModle.find();
      res.status(200).send({
        apiStatus: true,
        data: users,
        message: "fetched",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: true,
        data: e.message,
        message: "not fetched",
      });
    }
  };
  static logout = async (req, res) => {
    try {
      const user = req.user;
      const tokenIndex = user.tokens.findIndex(
        (token) => token.token == req.token
      );
      user.tokens.splice(tokenIndex, 1);
      await user.save();
      res.status(200).send({
        apiStatus: true,
        data: user,
        message: "logged out",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e.message,
        message: "can't log out",
      });
    }
  };
  static deleteMe = async (req, res) => {
    try {
      const deleted = await userModle.findByIdAndDelete({ _id: req.user._id });
      res.status(200).send({
        apiStatus: true,
        data: "",
        message: "deleted",
      });
    } catch {
      res.status(500).send({
        apiStatus: false,
        data: "",
        message: "can't delete you",
      });
    }
  };
  static edit = async (req, res) => {
    let errors = {};
    try {
      // const errors={}
      const user = await userModle.findOne({ email: req.body.email });
      if (
        !validator.isMobilePhone(req.body.phone, ["ar-EG"]) &&
        user &&
        !(req.user.email == req.body.email)
      ) {
        errors = { email: "email used befor", phone: "invalid phone format" };
        throw new Error();
      }
      if (!validator.isMobilePhone(req.body.phone, ["ar-EG"])) {
        errors.phone = "invalid phone format";
        throw new Error("invalid phone format");
      }
      if (user && !(req.user.email == req.body.email)) {
        errors.email = "email used before";
        // errors.push({email:"email used before"})
        throw new Error("email is used before");
      }
      const edited = await userModle.findByIdAndUpdate(
        { _id: req.user._id },
        req.body
      );
      res.status(200).send({
        apiStatus: true,
        data: "",
        message: "updated",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: errors,
        message: "can't edit you",
      });
    }
  };
  static getUser = async (req, res) => {
    try {
      res.status(200).send({
        apiStatus: true,
        data: req.user,
        message: "fetched",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: true,
        data: "",
        message: "user not found",
      });
    }
  };
  static changePassword = async (req, res) => {
    try {
      const oldPassword = req.body.oldPassword;
      const user = req.user;
      console.log(user);
      const match = await bcryptjs.compare(oldPassword, user.password);
      console.log(match);
      if (match) {
        user.password = await bcryptjs.hash(user.password, 15);
        await user.save();
        res.status(200).send({
          apiStatus: true,
          data: user,
          message: "changed",
        });
      } else {
        res.status(500).send({
          apiStatus: true,
          data: "",
          message: "incorrect password",
        });
      }
    } catch (e) {
      res.send({
        message: e,
      });
    }
  };
}
module.exports = User;

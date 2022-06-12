const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    trim: true,
  },
  birthDate: {
    type: Date,
    required: [true, "date of birth is required"],
    max: Date.now(),
  },
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("invalid email format");
    },
  },
  password: {
    type: String,
    // required:[true,"password is required"],
    // minlength:[5,"min val is 5"] ,
    // match:[new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"),"invalid password format"],
    // trim:true
  },
  phone: {
    type: String,
    trim: true,
    validate(value) {
      if (!validator.isMobilePhone(value, ["ar-EG"]))
        throw new Error("invalid phone format");
    },
  },
  pImage: {
    type: String,
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre("save", async function () {
  // console.log(this)
  const data = this;
  if (data.isModified("password"))
    data.password = await bcryptjs.hash(data.password, 15);
});
userSchema.methods.toJSON = function () {
  const data = this.toObject();
  delete data.password;
  delete data.__v;
  delete data.tokens;
  return data;
};

const User = mongoose.model("User", userSchema);
module.exports = User;

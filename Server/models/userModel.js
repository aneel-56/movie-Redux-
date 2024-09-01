const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is requierd"],
    // unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    // unique: true,
  },
  phone: {
    type: String,
    required: [true, "Your Phone number is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  socialLogin: {
    type: Boolean,
    default: false,
  },
  photo: {
    type: String,
    default: "profile.jpg",
  },
  favourites: [
    {
      id: { type: String },
      title: { type: String },
      media_type: { tyep: String },
      poster_path: { type: String },
      backdrop_path: { type: String },
      watched: { type: Boolean, default: false },
      release_date: { type: String },
    },
  ],
});

UserSchema.statics.registerStatics = async function (
  username,
  email,
  password,
  mobile,
  photo
) {
  if (!email || !username || !password || !mobile) {
    throw Error("Please provide all credentials");
  }

  const isAlreadyRegistered = await this.findOne({ email });

  if (isAlreadyRegistered) {
    throw Error("Your Email is already registered");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    username,
    email,
    password: hash,
    phone: mobile,
    photo,
  });
  return user;
};

UserSchema.statics.loginStatics = async function (email, password) {
  if (!email || !password) {
    throw Error("Please provide all credentails");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("There is no such User");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Password doesn't match with email");
  }

  return user;
};

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;

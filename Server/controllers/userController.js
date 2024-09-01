const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateHashedPassword = require("../utils/generateHashedPassword");
const generateRandomPassword = require("../utils/generateRandomPassword");
const generateJwtToken = require("../utils/generateToken");
const fs = require("fs");
const path = require("path");

const register = async (req, res) => {
  const { username, email, password, mobile, photo } = req.body;
  console.log(username, email, password, mobile);
  try {
    const user = await UserModel.registerStatics(
      username,
      email,
      password,
      mobile,
      photo
    );
    const token = await generateJwtToken(user._id);
    const { password: hashedPassword, ...rest } = user._doc;

    const imageData = fs.readFileSync(
      path.join(__dirname, "..", "uploads", `${user.photo}`)
    );

    const imageBase64 = Buffer.from(imageData).toString("base64");

    return res
      .cookie("token-movie", token, { httpOnly: false })
      .status(200)
      .json({ ...rest, imageData: imageBase64 });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.loginStatics(email, password);
    const token = await generateJwtToken(user._id);
    const { password: hashedPassword, ...rest } = user._doc;

    const imageData = fs.readFileSync(
      path.join(__dirname, "..", "uploads", `${user.photo}`)
    );

    const imageBase64 = Buffer.from(imageData).toString("base64");

    const toBeSent = { ...rest, imageData: imageBase64 };
    console.log("toBeSent", toBeSent);

    return res
      .cookie("token-movie", token, { httpOnly: false })
      .status(200)
      .json(toBeSent);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getAllFavourites = async (req, res) => {
  const { user_id } = req.params;
  console.log("id", user_id);
  try {
    const user = await UserModel.findOne({ _id: user_id }).select("favourites");
    if (!user) {
      throw Error("User not Available");
    }
    return res.status(200).json({ status: true, favourites: user.favourites });
  } catch (error) {
    return res.status(400).json({ status: false, error: error.message });
  }
};

const addFavourite = async (req, res) => {
  console.log("req.body", req.body);
  const {
    user_id,
    id,
    title,
    backdrop_path,
    poster_path,
    media_type,
    release_date,
  } = req.body;
  try {
    const user = await UserModel.findOne({ _id: user_id });
    if (!user) {
      throw Error("No such User");
    }
    let favourites = user.favourites;
    favourites.push({
      id,
      watched: false,
      title,
      backdrop_path,
      release_date,
      poster_path,
      media_type,
    });
    user.favourites = favourites;
    await user.save();
    return res.status(200).json({ status: true, data: user.favourites });
  } catch (error) {
    return res.status(400).json({ status: false, error: error.message });
  }
};

const deleteFavourite = async (req, res) => {
  const { user_id } = req.body;
  const { id } = req.params;

  console.log(user_id, id);

  try {
    const user = await UserModel.findOne({ _id: user_id });
    if (!user) {
      throw Error("No such User Found");
    }
    const newArr = user.favourites.filter((each) => {
      console.log("each", each);
      return each.id != id;
    });
    user.favourites = newArr;
    await user.save();
    return res.status(200).json({ status: true, user });
  } catch (error) {
    return res.status(400).json({ status: false, error: error.message });
  }
};

const socialRegister = async (req, res) => {
  let { username, email, phone, photo, social, socialLogin } = req.body;
  if (!phone) {
    phone = "900";
  }

  console.log("it is in register social", social);

  console.log(username, email, phone, photo, social, socialLogin);
  const password = generateHashedPassword();
  try {
    let isAlreadyRegistered;
    if (social == "twitter") {
      isAlreadyRegistered = await UserModel.findOne({ username });
    } else {
      isAlreadyRegistered = await UserModel.findOne({ email });
    }
    console.log(isAlreadyRegistered);
    if (isAlreadyRegistered) {
      throw Error("You are already registered");
    }

    let user;
    if (social) {
      if (!email) {
        email = `random${Math.floor(Math.random() * 10000)}@gmail.com`;
        console.log("email", email);
      }
      user = await UserModel.create({
        username,
        email,
        phone,
        photo,
        password,
        socialLogin,
      });
    } else {
      username = username + `${generateRandomPassword(5)}`;
      user = await UserModel.create({
        username,
        email,
        phone,
        photo,
        password,
        socialLogin,
      });
    }
    const token = generateJwtToken(user._id);
    const { password: hashedPassword, photo: userPhoto, ...rest } = user._doc;
    res.cookie("token", token, { expiresIn: "1h" });
    return res.status(200).json({ ...rest, imageData: userPhoto });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const socialLogin = async (req, res) => {
  const { social, email, username } = req.body;
  console.log(social, email, username);
  try {
    let user;
    if (social) {
      user = await UserModel.findOne({ username });
    } else {
      user = await UserModel.findOne({ email });
    }
    if (!user) {
      throw Error("You aren't registered");
    }
    const token = generateJwtToken(user._id);
    const { password: hashedPassword, photo: userPhoto, ...rest } = user._doc;
    res.cookie("token", token, { expiresIn: "1h" });
    return res.status(200).json({ ...rest, imageData: userPhoto });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { username, mobile } = req.body;
  console.log(username, mobile, req.file);
  try {
    const user = await UserModel.findOne({ _id: id });
    if (!user) {
      throw Error("No such user exist");
    }
    const toBeUpdatedUser = await UserModel.findOneAndUpdate(
      { _id: id },
      { phone: mobile, username, photo: req.file.filename },
      { new: true }
    );
    const { password: hashedPassword, ...rest } = toBeUpdatedUser._doc;
    const imageData = fs.readFileSync(
      path.join(__dirname, "..", "uploads", toBeUpdatedUser.photo)
    );
    const imageBase64 = Buffer.from(imageData).toString("base64");
    return res
      .status(200)
      .json({ status: true, data: { ...rest, imageData: imageBase64 } });
  } catch (error) {
    return res.status(400).json({ status: false, error: error.message });
  }
};

const updatePassword = async (req, res) => {
  const { _id, previous, newpass, confirm } = req.body;
  console.log("updatepassword", previous, newpass, confirm);
  try {
    const user = await UserModel.findOne({ _id });
    if (!user) {
      throw Error("We don't have email");
    }

    // checking the password whether it match or not
    const match = await bcrypt.compare(previous, user.password);
    if (!match) {
      throw Error("Your password is incorrect");
    }

    // checking if new passwrod and confirm password is same
    const same = newpass == confirm;
    if (!same) {
      throw Error("Type new password correctly");
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(newpass, salt);

    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      { password },
      { new: true }
    );
    console.log("user", updatedUser);
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteAccount = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findOne({ _id: id });
    if (!user) {
      throw Error("No such User");
    }
    const deleteUser = await UserModel.findOneAndDelete({ _id: id });
    return res.status(200).json({
      status: true,
      data: "Deletion Successfull",
      deletedUser: deleteAccount,
    });
  } catch (error) {
    return res.status(400).json({ status: false, error: error.message });
  }
};

const logout = async (req, res) => {
  console.log("req.cookie", req.cookies);
  return res
    .clearCookie("token")
    .status(200)
    .json({ status: "You have sign out" });
};

module.exports = {
  register,
  login,
  getAllFavourites,
  addFavourite,
  deleteFavourite,
  updateProfile,
  socialRegister,
  socialLogin,
  updatePassword,
  deleteAccount,
  logout,
};

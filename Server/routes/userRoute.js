const express = require("express");
const {
  register,
  login,
  logout,
  deleteAccount,
  updatePassword,
  socialRegister,
  socialLogin,
  getAllFavourites,
  addFavourite,
  deleteFavourite,
  updateProfile,
} = require("../controllers/userController");
const requireAuth = require("../utils/requireAuth");
const userUpload = require("../middleware/userMulter");

const Router = express.Router();

Router.post("/register", register);

Router.post("/login", login);

Router.post("/social-register", socialRegister);

Router.post("/social-login", socialLogin);

Router.get("/get-favourites/:user_id", getAllFavourites);

Router.post("/add-favourite", addFavourite);

Router.delete("/delete-favourite/:id", deleteFavourite);

Router.post("/update-account/:id", userUpload.single("image"), updateProfile);

Router.patch("/update-password/:id", updatePassword);

Router.delete("/delete-account/:id", deleteAccount);

Router.get("/logout", logout);

module.exports = { userRouter: Router };

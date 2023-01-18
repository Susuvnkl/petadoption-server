const { Router } = require("express");
const express = require(`express`);
const usersController = require("../controllers/usersController");
const {
  passwordsMatch,
  isNewUser,
  hashPass,
  doesUserExist,
  verifyPassword,
  validateBody,
  adminAuth,
  userAuth,
} = require("../middleware/usersMiddleware");
const { signUpSchema } = require("../schemas/usersSchema");
const router = express.Router();

router.get(`/`, usersController.updateStatesByCookie);
router.delete(`/`, usersController.deleteCookie);
router.post(`/signup`, validateBody(signUpSchema), passwordsMatch, isNewUser, hashPass, usersController.signup);
router.post(`/passwordVerify`, doesUserExist, verifyPassword, usersController.verifyPassword);
router.post(`/login`, doesUserExist, verifyPassword, usersController.login); //need to add , validateBody(loginSchema)
router.get(`/userInfo`, userAuth, usersController.getUserInfo); //This api allows you to get a user based on the user's id.
router.put(`/UpdateUserInfo`, userAuth, passwordsMatch, hashPass, usersController.updateUserInfo); //for user This API allows you to change your settings while logged in.
//Validate user inputs
//Ensure that if the email is being changed it’s not already in use

router.get(`/getAll`, adminAuth, usersController.getAllUsers); //admin The GET users API returns all users in the DB.
router.get(`/:userid/full`); //admin This api allows you to get a user based on the user's id.

module.exports = router;

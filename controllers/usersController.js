const bycrpt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);
const dbConnection = require("../knex/knex");
const { addUserModel, getUserInfoModel, updateUserInfomodel } = require("../models/usersModels");
require(`dotenv`).config();

const signup = async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, email, password, phoneNumber } = req.body;
  try {
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
    };
    const userId = await addUserModel(newUser);

    res.send({ userId: userId, ok: true });
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateUserInfo = async (req, res) => {
  const { userId, firstName, lastName, email, password, phoneNumber } = req.body;
  try {
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
    };

    const updatedUser = await updateUserInfomodel(newUser, userId);
    console.log(updatedUser);
    res.send(`updated`);
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  console.log(req.body);
  const { user } = req.body;
  const token = jwt.sign(
    { userName: `${user.firstName} ${user.lastName}`, id: user.userId, role: user.role },
    process.env.TOKEN_SECRET,
    { expiresIn: "2h" }
  );
  console.log(token, `token`);
  res.cookie("token", token, {
    maxAge: 7200000,
    httpOnly: true,
    secure: process.env.NODE_ENV === true,
    //  "production" ? true : false,
    sameSite: process.env.NODE_ENV === "lax",
    // "production" ? "none" : "lax",
  });
  res.send({
    token: token,
    userName: `${user.firstName} ${user.lastName}`,
    role: user.role,
    userId: user.userId,
  });
};

const updateStatesByCookie = async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(401).send("Token Required");
    return;
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send("Invalid Token");
      return;
    } else {
      console.log(decoded);
      res.send(decoded);
    }
  });
};

const deleteCookie = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    res.send(`deleted`);
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    console.log(`try`);
    const usersList = await dbConnection.select().from("users");
    res.send(usersList);
  } catch (error) {
    console.log(error);
  }
};

const getUserInfo = async (req, res) => {
  const { userId } = req.body;
  try {
    const userInfo = await getUserInfoModel(userId);
    console.log(userInfo);
    res.send(userInfo);
  } catch (error) {
    console.log(error);
  }
};

const verifyPassword = async (req, res) => {
  try {
    res.send(`true`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { verifyPassword, signup, login, updateStatesByCookie, deleteCookie, getAllUsers, getUserInfo, updateUserInfo };

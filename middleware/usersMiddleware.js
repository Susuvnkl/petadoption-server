require(`dotenv`).config();
const Ajv = require("ajv");
const ajv = new Ajv();
const bcrypt = require("bcrypt");
const dbConnection = require("../knex/knex");
const { getUserByEmailModel } = require("../models/usersModels");
const jwt = require(`jsonwebtoken`);

const passwordsMatch = (req, res, next) => {
  if (req.body.password !== req.body.confirmPaswword) {
    res.status(400).send("Wrong password");
    return;
  }
  next();
};

const isNewUser = async (req, res, next) => {
  const user = await getUserByEmailModel(req.body.email);
  console.log(user);
  if (user) {
    res.status(400).send(`User Already exists`);
    return;
  }
  next();
};

const hashPass = (req, res, next) => {
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    req.body.password = hash;
    next();
  });
};

function validateBody(schema) {
  return (req, res, next) => {
    const valid = ajv.validate(schema, req.body);
    if (!valid) {
      res.status(400).send(ajv.errors[0].message);
      return;
    }
    next();
  };
}

const doesUserExist = async (req, res, next) => {
  console.log(req.body);
  const user = await getUserByEmailModel(req.body.email);
  if (!user) {
    res.status(400).send(`User with this email doesnt exist`);
    return;
  }
  req.body.user = user;
  next();
};

const verifyPassword = async (req, res, next) => {
  console.log(req.body, `what`);
  const { password, user } = req.body;
  try {
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      } else if (!result) {
        res.status(400).send(`password dont match`);
      } else {
        next();
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const userAuth = (req, res, next) => {
  const { token } = req.cookies;
  // console.log(token);
  if (!token) {
    res.status(401).send("Token Required");
    console.log(`UserAuth Failed`);
    return;
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send("Invalid Token");
      console.log(`UserAuth Failed`);
      return;
    } else {
      req.body.userId = decoded.id;
      next();
    }
  });
};

const adminAuth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(401).send("Token Required");
    return;
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send("Invalid Token");
      return;
    } else if (decoded.role !== "admin") {
      res.status(401).send("must be an admin");
    } else {
      // req.body.userId = decoded.id;
      next();
    }
  });
};
const adminAuthAddPet = (req, res, next) => {
  const { token } = req.cookies;
  console.log(token);
  if (!token) {
    res.status(401).send("Token Required");
    return;
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send("Invalid Token");
      return;
    } else if (decoded.role !== "admin") {
      res.status(401).send("must be an admin");
    } else {
      console.log(decoded);
      next();
    }
  });
};

module.exports = {
  adminAuthAddPet,
  passwordsMatch,
  isNewUser,
  hashPass,
  doesUserExist,
  verifyPassword,
  validateBody,
  adminAuth,
  userAuth,
};

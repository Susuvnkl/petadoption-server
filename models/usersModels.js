const dbConnection = require("../knex/knex");

const getUserByEmailModel = async (email) => {
  try {
    const user = await dbConnection.from("users").where({ email: email }).first(); //id exist returns the hole user
    return user;
  } catch (err) {
    console.log(err);
  }
};

const addUserModel = async (newUser) => {
  try {
    const [id] = await dbConnection.from("users").insert(newUser);
    console.log(id);
    return id;
  } catch (err) {
    console.log(err);
  }
};

const getUserInfoModel = async (userId) => {
  try {
    const res = await dbConnection
      .select()
      .from("users")
      .where({ userId: `${userId}` });
    return res;
  } catch (error) {
    console.log(error);
  }
};

const updateUserInfomodel = async (newUser, userId) => {
  try {
    const res = dbConnection
      .from("users")
      .where({ userId: `${userId}` })
      .update(newUser);
    return res;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUserByEmailModel, addUserModel, getUserInfoModel, updateUserInfomodel };

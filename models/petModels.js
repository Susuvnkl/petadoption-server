const dbConnection = require("../knex/knex");

const readAllPetsFromDBModel = async () => {
  try {
    const petsList = await dbConnection.from("pets");
    // console.log(petsList);
    return petsList;
  } catch (err) {
    console.log(err);
  }
};

const selectPetByIdModal = async (petId) => {
  try {
    const petInfo = await dbConnection.from("pets").where({ petId: petId });
    console.log(petInfo);
    return petInfo;
  } catch (err) {
    console.log(err);
  }
};

const addNewPetModel = async (newPet) => {
  try {
    const [addedPetId] = await dbConnection.from("pets").insert(newPet);
    return addedPetId;
  } catch (err) {
    console.log(err);
  }
};

const updatePetInfoModal = async (updatedPetInfo) => {
  try {
    const res = await dbConnection.from("pets").where({ petId: updatedPetInfo.petId }).update(updatedPetInfo);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const changePetAdoptionStatusModal = async (loggedUserId, petId, action) => {
  console.log(loggedUserId, petId);
  try {
    const res = await dbConnection
      .from("pets")
      .where({ petId: `${petId}` })
      .update({ adoptionStatus: action, ownerId: loggedUserId });
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getOwnedPetsByUserIdModal = async (userId) => {
  console.log(userId);
  try {
    const res = await dbConnection.from("pets").where({ ownerId: `${userId}` });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const returnPetModal = async (petId, action) => {
  console.log(petId);
  try {
    const res = await dbConnection
      .from("pets")
      .where({ petId: `${petId}` })
      .update({ adoptionStatus: action, ownerId: "0" });
    return res;
  } catch (error) {
    console.log(error);
  }
};

const likePetModal = async (petId, userId) => {
  try {
    const res = await dbConnection.from("likes").insert({ userId: `${userId}`, petId: `${petId}` });
    console.log(res);
    return `Like Added`;
  } catch (error) {
    console.log(error);
  }
};

const dislikePetModal = async (petId, userId) => {
  console.log(petId, userId);
  try {
    const res = await dbConnection
      .from("likes")
      .where({ userId: `${userId}` })
      .andWhere({ petId: `${petId}` })
      .del();
    console.log(res);
    return "Dislike";
  } catch (error) {
    console.log(error);
  }
};

const doesPetLikedModal = async (petId, userId) => {
  try {
    const res = await dbConnection
      .from("likes")
      .where({ userId: `${userId}` })
      .andWhere({ petId: `${petId}` });
    // console.log(res);
    return res[0];
  } catch (error) {
    console.log(error);
  }
};

const likedPetsListModal = async (userId) => {
  console.log(userId);
  try {
    const res = await dbConnection
      .from("pets")
      .join("likes", "pets.petId", "=", "likes.petId")
      .where({ userId: `${userId}` });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const searchPetsModal = async (query) => {
  // console.log(query);
  const { adoptionStatus, name, Weight, Height, type } = query;
  //   query.searchInfo;
  console.log(adoptionStatus, name, Weight, Height, type);
  try {
    const res = await dbConnection.from("pets").where((qb) => {
      if (name) qb.where({ name: name });
      if (Weight) qb.whereBetween(`weight`, Weight);
      if (Height) qb.whereBetween(`height`, Height);
      if (adoptionStatus) qb.whereIn("adoptionStatus", adoptionStatus);
      if (type) qb.whereIn("type", type);
    });
    console.log(res, `this`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const deletePetModel = async (petId) => {
  try {
    const res = dbConnection
      .from("pets")
      .where({ petId: `${petId}` })
      .del();
    return res;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  doesPetLikedModal,
  searchPetsModal,
  readAllPetsFromDBModel,
  addNewPetModel,
  selectPetByIdModal,
  updatePetInfoModal,
  changePetAdoptionStatusModal,
  getOwnedPetsByUserIdModal,
  returnPetModal,
  likePetModal,
  dislikePetModal,
  likedPetsListModal,
  deletePetModel,
};

const { query } = require("express");
const dbConnection = require("../knex/knex");
const {
  addNewPetModel,
  readAllPetsFromDBModel,
  selectPetByIdModal,
  updatePetInfoModal,
  changePetAdoptionStatusModal,
  getOwnedPetsByUserIdModal,
  returnPetModal,
  likePetModal,
  dislikePetModal,
  doesPetLikedModal,
  likedPetsListModal,
  searchPetsModal,
  deletePetModel,
} = require(`../models/petModels`);

const addPet = async (req, res) => {
  req.body.photos = req.file.path;
  try {
    const addedPetId = await addNewPetModel(req.body);
    if (addedPetId) {
      const addedPet = {
        ...req.body,
        id: addedPetId,
      };
      res.send(addedPet);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getAllPets = async (req, res) => {
  try {
    const petsList = await readAllPetsFromDBModel();
    res.send(petsList);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getPetById = async (req, res) => {
  // console.log(req.params, `params`);
  const { petId } = req.params;
  const petsInfo = await selectPetByIdModal(petId);
  if (petsInfo) {
    res.send(petsInfo);
  }
};

const deletePet = async (req, res) => {
  const petId = req.params.petId.replace(":", "");
  console.log(petId);
  try {
    const deletePet = await deletePetModel(petId);
    res.send(`deleted`);
  } catch (error) {
    console.log(error);
  }
};

const editPetById = async (req, res) => {
  try {
    const updatedPetInfo = req.body;
    delete updatedPetInfo.created_at;
    const updatedPet = await updatePetInfoModal(updatedPetInfo);
    console.log(updatedPet);
    res.send(`Pet Updated!`);
  } catch (error) {
    console.log(error);
  }
};

const changePetAdoptionStatus = async (req, res) => {
  const { loggedUserId, action } = req.body;
  const { petId } = req.params;
  try {
    const newStatus = await changePetAdoptionStatusModal(loggedUserId, petId, action);
    console.log(newStatus);
    res.send(`new`);
  } catch (error) {
    console.log(error);
  }
};

const returnPet = async (req, res) => {
  const { petId } = req.params;
  const { action } = req.body;
  console.log(petId, req.params);
  try {
    const returnPet = await returnPetModal(petId, action);
    console.log(returnPet);
    res.send(`Returned`);
  } catch (error) {
    console.log(error);
  }
};

const likePet = async (req, res) => {
  const { petId } = req.params;
  const { userId } = req.body;
  try {
    const likeThePet = await likePetModal(petId, userId);
    res.send(`handleLike`);
  } catch (error) {
    console.log(error);
  }
};
const dislikePet = async (req, res) => {
  const { petId } = req.params;
  const { userId } = req.body;
  try {
    const dislikepet = await dislikePetModal(petId, userId);
    res.send(`Dislike`);
  } catch (error) {
    console.log(error);
  }
};

const getOwnedPetsByUserId = async (req, res) => {
  const { userId } = req.body;
  try {
    const myPets = await getOwnedPetsByUserIdModal(userId);
    console.log(myPets);
    res.send(myPets);
  } catch (error) {
    console.log(error);
  }
};

const adminGetOwnedPetsByUserId = async (req, res) => {
  const { userId } = req.params;
  console.log(userId, `get params`, req.query);
  try {
    const myPets = await getOwnedPetsByUserIdModal(userId);
    console.log(myPets);
    res.send(myPets);
  } catch (error) {
    console.log(error);
  }
};

const doesPetLiked = async (req, res) => {
  const { petId } = req.params;
  const { userId } = req.body;
  try {
    const isLiked = await doesPetLikedModal(petId, userId);
    // console.log(isLiked, `controller`);
    res.send(isLiked);
  } catch (error) {
    console.log(error);
  }
};

const getLikedPets = async (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  try {
    const likedPetsList = await likedPetsListModal(userId);
    res.send(likedPetsList);
  } catch (error) {
    console.log(error);
  }
};

const getPetsBySearch = async (req, res) => {
  const query = req.query;
  try {
    const searchPets = await searchPetsModal(query);
    console.log(searchPets);
    res.send(searchPets);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addPet,
  getPetsBySearch,
  adminGetOwnedPetsByUserId,
  getAllPets,
  getPetById,
  deletePet,
  editPetById,
  changePetAdoptionStatus,
  returnPet,
  likePet,
  dislikePet,
  getOwnedPetsByUserId,
  doesPetLiked,
  getLikedPets,
};

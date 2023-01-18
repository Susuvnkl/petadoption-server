const { Router } = require("express");
const express = require(`express`);
const { adminAuthAddPet, userAuth, adminAuth } = require(`../middleware/usersMiddleware`);
const petsController = require(`../controllers/petsController`);
const { upload, makeUrl } = require("../middleware/imageMiddleware");
const router = express.Router();

router.post(`/`, upload.single("photos"), petsController.addPet); //only admin to local folder images
router.delete(`/:petId`, adminAuth, petsController.deletePet); //only admin delete pet
router.get(`/`, petsController.getAllPets); //search list
router.get(`/search`, petsController.getPetsBySearch); //search list
router.get(`/:petId`, petsController.getPetById); //prt page
router.put(`/:petId`, adminAuth, petsController.editPetById); // Admin Edit pet
router.post(`/:petId/adopt`, userAuth, petsController.changePetAdoptionStatus); //user foster/adopt
router.post(`/:petId/return`, userAuth, petsController.returnPet); //user adopt
router.post(`/:petId/like`, userAuth, petsController.likePet); //user like
router.delete(`/:petId/like`, userAuth, petsController.dislikePet); //user cancle like
router.get(`/:petId/doesLiked`, userAuth, petsController.doesPetLiked); //user cancle like
router.get(`/get/likedPets`, userAuth, petsController.getLikedPets); //users liked pets
router.get(`/user/:userId`, userAuth, petsController.getOwnedPetsByUserId); //This api allows a user to get the pets owned by (or saved) by a user based on the user id.
router.get(`/user/admin/:userId`, adminAuth, petsController.adminGetOwnedPetsByUserId); //This api allows a user to get the pets owned by (or saved) by a user based on the user id.

module.exports = router;

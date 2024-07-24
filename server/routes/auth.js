const express = require("express");

const {
  signup,
  login,
  createProfile,
  getAllUsers,
  createGroup,
  search,
  getAllGroupsJoined,
  getAllGroups,
  getGroupDetails,
  getUserDetails
} = require("../controllers/auth.js");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/create-profile", createProfile);
router.post("/create-group", createGroup);
router.get("/all-users", getAllUsers);
router.get("/user-details", getUserDetails);
router.get("/search-users", search);
router.get("/get-groups", getAllGroupsJoined);
router.get("/all-groups", getAllGroups);
router.get("/group-details", getGroupDetails);

module.exports = router;

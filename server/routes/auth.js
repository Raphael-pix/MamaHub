const express = require("express");
const multer = require("multer")

const {
  signup,
  login,
  createProfile,
  getAllUsers,
  getUserDetails,
  search,
} = require("../controllers/users-controller.js")
const {
  createGroup,
  getAllGroupsJoined,
  getAllGroups,
  getGroupDetails,
  joinGroup,
} = require("../controllers/groups-controller.js")

const{shareJourney} = require("../controllers/posts-controller.js")
const upload = multer({ dest: 'uploads/' }); // Configure multer to store files in 'uploads/' folder


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
router.put("/join-group",joinGroup)

router.post("/create-post",upload.single('media'),shareJourney)

module.exports = router;

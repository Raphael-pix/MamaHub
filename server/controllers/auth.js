const { connect } = require("getstream");
const bcrypt = require("bcrypt");
const StreamChat = require("stream-chat").StreamChat;
const crypto = require("crypto");
const Users = require("../model/users");
const Groups = require("../model/groups");
const users = require("../model/users");

require("dotenv").config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const passwordReq = [
  "at least one uppercase letter",
  "at least one lowercase letter",
  "at least one digit",
  "at least one special character(@,*,#,%,-,$,+,!)",
  "at least 8 characters",
];

// user controllers

const signup = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  const currentDate = new Date();

  //validation of values
  if (!isValidEmail(email)) {
    return res
      .status(404)
      .json({ message: ["email is not valid.Please try again"] });
  }
  if (password !== confirmPassword) {
    return res.status(404).json({ message: ["passwords do not match"] });
  }
  if (!isValidPassword(password)) {
    return res.status(404).json({ message: passwordReq });
  }

  try {
    //check if the user exists in the database
    const existsingUser = await Users.findOne({ email: email });

    if (existsingUser) {
      return res.status(404).json({ message: ["email already taken"] });
    }

    //create a random userID
    const userId = crypto.randomBytes(16).toString("hex");
    const hashedPassword = await bcrypt.hash(password, 10);

    //create user in getStream
    const serverClient = connect(api_key, api_secret, app_id);
    const token = serverClient.createUserToken(userId);

    //create user in database
    const newUser = new Users({
      userId,
      email,
      password: hashedPassword,
      date: currentDate,
    });

    try {
      if (token) {
        await newUser.save();
      }
    } catch (err) {
      console.log(e);
      return res
        .status(500)
        .json({ message: ["unable to save user to database"] });
    }

    res.status(200).json({ token, userId, email, hashedPassword });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: ["unable to create user"] });
  }
};

const createProfile = async (req, res) => {
  const { avatar, name, date, bio, gender, userId } = req.body;

  try {
    const client = StreamChat.getInstance(api_key, api_secret);
    const updateToken = crypto.randomBytes(16).toString("hex");

    //update stream user database
    const update = {
      id: userId,
      set: {
        avatar: avatar,
        name: name,
        DateOfBirth: date,
        bio: bio,
        gender: gender,
        profileToken: updateToken,
      },
    };

    const response = await client.partialUpdateUser(update);

    const updatedUser = response.users[userId];
    const profileToken = updatedUser.profileToken;

    //update user info in database
      const updateUser = await Users.updateOne(
        { userId },
        {
          $set: {
            avatar,
            name,
            dateOfBirth: date,
            bio,
            gender,
            profileToken: updateToken,
          },
        }
      );

      if (updateUser.matchedCount === 0) {
        return res.status(404).json({ message: ["User not found"] });
      }

    res.status(200).json({ ...updatedUser, avatar, name, profileToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ["Failed to update profile"] });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //check if user exists in the database
    const user = await Users.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: ["user does  not exist"] });
    }

    const serverClient = connect(api_key, api_secret, app_id);
    const client = StreamChat.getInstance(api_key, api_secret);

    const { users } = await client.queryUsers({ email: email });

    if (!users.length)
      return res.status(400).json({ message: ["User not found"] });

    const success = await bcrypt.compare(password, user.password);

    const { id, profileToken, avatar } = users[0];

    //check if the user has the following properties so as to determine if the user has created their profile
    if (users[0].hasOwnProperty("name" || "bio" || "avatar")) {
      const token = serverClient.createUserToken(users[0].id);

      if (success) {
        res.status(200).json({
          token,
          userId: id,
          profileToken: profileToken,
          email: users[0].email,
          avatar: avatar,
        });
      } else {
        res.status(500).json({ message: ["Incorrect password"] });
      }
    } else {
      res
        .status(400)
        .json({ message: ["Must create profile first before logging in"] });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: ["unable to log in"] });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();

    if (users.length < 0) {
      return res.status(200).json({ message: "no users found" });
    }
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "unable to get users" });
  }
};
const getUserDetails = async (req, res) => {
  const { id } = req.query;
  try {
    const user = await Users.findOne({userId:id} );

    if (!user) {
      return res.status(200).json({ message: "user not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "unable to get user details" });
  }
};

const search = async (req, res) => {
  const { query } = req.query; // Use req.query for GET request parameters

  try {
    // Check if users exist in the database with a name similar to the query
    const users = await Users.find({ name: new RegExp(query, "i") }); // Use RegExp for case-insensitive search

    if (!users.length) {
      return res.status(404).json({ message: "User does not exist" });
    }

    res.status(200).json({ users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to search users" });
  }
};

// group controllers

const createGroup = async (req, res) => {
  const { avatar, banner, name, description,status,members, topics, userId } =
    req.body;
  const currentDate = new Date();
  const client = StreamChat.getInstance(api_key, api_secret);

  try {
    //check if the group exists in the database
    const existsingGroup = await Groups.findOne({ name: name });

    if (existsingGroup) {
      return res.status(404).json({ message: ["group name already taken"] });
    }

    //create a random groupID
    const groupId = crypto.randomBytes(16).toString("hex");
    const allMembers = [...members, { userId }];
    const formattedMembers = allMembers.map((member) => ({
      user: { id: member.userId },
    }));

    const channel = client.channel("messaging", groupId, {
      image: avatar,
      banner: banner,
      name: name,
      status: status,
      description: description,
      members: formattedMembers,
      topics: topics,
      created_by_id: userId,
    });
    await channel.create();

    //create group in database
    const newGroup = new Groups({
      groupId,
      avatar,
      banner,
      name,
      description,
      status,
      members: allMembers,
      topics,
      created_by: userId,
      date: currentDate,
    });
    try {
      await newGroup.save();
    } catch (err) {
      console.log(e);
      return res
        .status(500)
        .json({ message: ["unable to save group to database"] });
    }
    const addGroupsToUserDb = async () => {
      const allMembers = [...members, { userId }];
      const updatePromises = allMembers.map((member) =>
        Users.updateOne(
          { userId: member.userId },
          { $addToSet: { groups: groupId } } // $addToSet ensures no duplicates
        )
      );
      await Promise.all(updatePromises); // Wait for all updates to complete
    };

    try {
      await addGroupsToUserDb();
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: ["Unable to update user groups in database"] });
    }

    res.status(200).json({ message: "channel created successfully" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: ["unable to create group"] });
  }
};

const getAllGroupsJoined = async (req, res) => {
  const { userId } = req.query;

  try {
    // Find the user by their userId
    const user = await Users.findOne({ userId: userId });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Retrieve group details for the groups the user has joined
    const groups = await Groups.find({ groupId: { $in: user.groups } });

    return res.status(200).json(groups);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllGroups = async (req, res) => {
  try {
    const groups = await Groups.find();

    if (groups.length < 0) {
      return res.status(200).json({ message: "no groups found" });
    }
    return res.status(200).json(groups);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "unable to get groups" });
  }
};

const getGroupDetails = async (req, res) => {
  const { id } = req.query;
  try {
    const group = await Groups.findOne({ groupId: id });

    if (!group) {
      return res.status(200).json({ message: "group not found" });
    }
    return res.status(200).json(group);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "unable to get group details" });
  }
};



//VALIDATION FUNCTIONS

// Function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to validate password format
function isValidPassword(password) {
  // const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@*#%-$+!])[a-zA-Z\d@*#%-$+!]{8,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])/;
  return passwordRegex.test(password);
}

module.exports = {
  signup,
  login,
  createProfile,
  createGroup,
  getAllUsers,
  getUserDetails,
  search,
  getAllGroupsJoined,
  getAllGroups,
  getGroupDetails,
};

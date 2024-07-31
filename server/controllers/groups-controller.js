const StreamChat = require("stream-chat").StreamChat;
const crypto = require("crypto");

const Users = require("../model/users");
const Groups = require("../model/groups");

require("dotenv").config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;

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

//posts controllers


module.exports = {
  createGroup,
  getAllGroupsJoined,
  getAllGroups,
  getGroupDetails,
};

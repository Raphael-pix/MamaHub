const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const Users = require("../model/users");
const Groups = require("../model/groups");
const Posts = require("../model/post");

const cloudinary_api_key = process.env.CLOUDINARY_API_KEY;
const cloudinary_cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinary_api_secret = process.env.CLOUDINARY_API_SECRET;
cloudinary.config({
  cloud_name: cloudinary_cloud_name,
  api_key: cloudinary_api_key,
  api_secret: cloudinary_api_secret,
});

const uploadPostToCloudinary = async (file_path, file_type) => {
  try {
    let result;
    if (file_type === "image") {
      result = await cloudinary.uploader.upload(file_path, {
        resource_type: "image",
        folder: "posts",
      });
    } else if (file_type === "video") {
      result = await cloudinary.uploader.upload(file_path, {
        resource_type: "video",
        folder: "posts",
      });
    }
    return result;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Cloudinary upload failed");
  }
};

const shareJourney = async (req, res) => {
  const { caption } = req.body;
  const file = req.file;
  const fileType = file.mimetype.startsWith("image/") ? "image" : "video";
  const currentDate = new Date();

  try {
    //upload post in cloudinary
    const post = await uploadPostToCloudinary(file.path, fileType);
    console.log(post);
    //create post in database
    const newPost = new Posts({
      media: post,
      caption,
      created_at: currentDate,
      updated_at: currentDate,
    });
    try {
      await newPost.save();
      return res.status(200).json({ post: newPost });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: ["unable to save post to database"] });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: ["unable to upload post to cloundinary"] });
  }
};

module.exports = {
  shareJourney,
};

const User = require("../../models/User");

const getAllUsers = async (req, res) => {
  const users = await User.find();

  if (!users) {
    res.status(400);
    throw new Error("Users not found");
  } else {
    res.status(200).json({ users });
  }
};

const deletedAllUsers = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUsers = await User.findByIdAndDelete(userId);
    if (!deletedUsers) {
      return res.status(400).json({ message: "users not found" });
    }
    res.status(200).json({ message: "User Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllUsers, deletedAllUsers };

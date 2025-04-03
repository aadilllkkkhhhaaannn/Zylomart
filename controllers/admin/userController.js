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

module.exports = { getAllUsers };

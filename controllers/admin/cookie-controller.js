const cookies = require("../../models/cookie");

const getAllCookies = async (req, res) => {
  try {
    const allCookie = await cookies.find().sort({ createdAt: -1 });
    res.json(allCookie);
  } catch (error) {
    console.error("Failed to fetch consents:", error);
    res.status(500).json({ error: "Failed to fetch consents" });
  }
};

module.exports = { getAllCookies };

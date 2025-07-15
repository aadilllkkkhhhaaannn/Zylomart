const express = require("express");
const {
  getAllUsers,
  deletedAllUsers,
} = require("../../controllers/admin/userController");

const router = express.Router();

router.get("/get", getAllUsers);
router.delete("/:id", deletedAllUsers);

module.exports = router;

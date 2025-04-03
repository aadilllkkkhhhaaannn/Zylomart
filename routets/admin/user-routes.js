const express = require("express");
const { getAllUsers } = require("../../controllers/admin/userController");

const router = express.Router();

router.get("/get", getAllUsers);

module.exports = router;

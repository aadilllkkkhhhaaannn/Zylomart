const express = require("express");
const { getAllCookies } = require("../../controllers/admin/cookie-controller");
const router = express.Router();

router.get("/getCookie", getAllCookies);

module.exports = router;

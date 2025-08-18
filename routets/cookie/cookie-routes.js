const express = require("express");
const { cookieConsent } = require("../../controllers/cookie/cookie-controller");

const router = express.Router();

router.post("/create", cookieConsent);

module.exports = router;

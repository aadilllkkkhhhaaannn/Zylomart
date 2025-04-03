const express = require("express");

const {
  addFetureImage,
  getFeatureImages,
} = require("../../controllers/admin/fetures-controller");

const router = express.Router();

router.post("/add", addFetureImage);
router.get("/get", getFeatureImages);

module.exports = router;

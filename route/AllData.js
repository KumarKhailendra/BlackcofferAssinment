const express = require("express");
const { getAllData } = require("../controller/dataController");

const router = express.Router();

router.route("/").get(getAllData);

module.exports = router;
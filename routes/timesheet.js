const express = require("express");
const router = express.Router();
const controller = require("../controllers/timesheetController");

router.get("/:year?", controller.getTimesheet);
router.post("/add-line/:year", controller.addLine);
router.get("/edit-line/:year/:index", controller.editLinePage);
router.post("/update-line/:year/:index", controller.updateLine);
router.get("/duplicate-line/:year/:index", controller.duplicateLine);
router.get("/delete-line/:year/:index", controller.deleteLine);

module.exports = router;

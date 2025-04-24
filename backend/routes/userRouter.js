const router = require("express").Router();

const { protectRoute } = require("../middlewares/protectRoute");
const { getNotification } = require("../controllers/studentController");

router.get("/notification", protectRoute, getNotification);

module.exports = router;

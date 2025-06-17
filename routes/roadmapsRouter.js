const router = require("express").Router();

const { restrictTo } = require("../middlewares/restrictTo");
const { protectRoute } = require("../middlewares/protectRoute");

const {
  getRoadmaps,
  getRoadmap,
  getRoadmapStage,
  createRoadmap,
  addRoadmapStage,
  deleteRoadmapStage,
  updateRoadmapStage,
  deleteRoadmap,
} = require("../controllers/roadmapsController");

const { isLoggedIn } = require("../middlewares/isLoggedIn");

router.get("/", getRoadmaps);

router.get("/:id", isLoggedIn, getRoadmap);

router.get("/:id/stages/:number", protectRoute, getRoadmapStage);

router.post("/", protectRoute, restrictTo("content manager"), createRoadmap);

router.post(
  "/:id/add-stage",
  protectRoute,
  restrictTo("content manager"),
  protectRoute,
  addRoadmapStage
);

router.delete(
  "/:id/delete-stage/:stageId",
  protectRoute,
  restrictTo("content manager"),
  deleteRoadmapStage
);

router.put(
  "/:id/update-stage/:stageId",
  protectRoute,
  restrictTo("content manager"),
  updateRoadmapStage
);

router.delete(
  "/:id",
  protectRoute,
  restrictTo("content manager"),
  deleteRoadmap
);

module.exports = router;

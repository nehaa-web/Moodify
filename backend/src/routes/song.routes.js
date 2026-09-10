const { Router } = require("express");
const upload = require("../middlewares/upload.middleware");
const songController = require("../controllers/song.controller");

const router = Router();

// POST /api/songs/
router.post("/", upload.any(), songController.uploadSong);

// POST /api/songs/
router.get("/", songController.getSong);

module.exports = router;

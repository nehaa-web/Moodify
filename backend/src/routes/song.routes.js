const { Router } = require("express")
const upload = require("../middlewares/upload.middleware")
const songController = require("../controllers/song.controller")

const router = Router()

// POST /api/song/
router.post("/" , upload.single("song") , songController.uploadSong)

module.exports = router
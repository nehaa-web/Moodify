const multer = require("multer")

const storage = multer.memoryStorage()

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 50, // 50MB
  },
});
module.exports = upload
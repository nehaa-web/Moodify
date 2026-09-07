const ImageKit = require("@imagekit/nodejs").default

const client = new ImageKit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY
})

module.exports = client
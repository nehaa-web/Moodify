const ImageKit = require("@imagekit/nodejs").default

const client = new Imagekit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY
})

module.exports = client
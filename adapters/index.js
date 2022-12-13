const { LocalFileAdapter } = require('@keystonejs/file-adapters')

const fileAdapter = new LocalFileAdapter({
    src: process.env.UPLOAD_SRC,
    path: process.env.UPLOAD_PATH
})

module.exports = {
    fileAdapter
}
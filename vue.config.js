const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'assets',
    lintOnSave: false,
    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("src"))
    }
}
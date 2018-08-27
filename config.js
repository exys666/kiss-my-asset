
const defaultConfig = {
    outputDir: '_site'
}

exports.load = function () {
    const configPath = `${process.cwd()}/kiss-my-asset.js`

    try {
        const config =  require(configPath)
        return Object.assign(defaultConfig, config)
    } catch (ex) {
        console.log(ex)
        throw 'Unable to read config'
    }
}


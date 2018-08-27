const fs = require('fs-extra')
const http = require('http')

const requireUncached = (module) => {
    delete require.cache[require.resolve(module)]
    return require(module)
}

const extractDir = (path) => {
    return path.substring(0, path.lastIndexOf('/'))
}

const genFile = async function (outputDir, path, generate) {
    const content = generate(path)
    const dir = `${outputDir}/${extractDir(path)}`

    await fs.mkdirp(dir)
    await fs.writeFile(`${outputDir}${path}`, content, { flag: 'w' })
}

const genPaths = function (routes) {
    return routes
        .map(route => {
            const path = typeof route.path === 'function' ? route.path() : route.path

            if (Array.isArray(path)) {
                return path.map(p => ({path: p, use: route.use}))
            } else {
                return [route]
            }
        })
        .reduce((acc, val) => acc.concat(val), [])
}

exports.clean = async function () {
    const config = require(`${process.cwd()}/kiss-my-asset.js`)
    await fs.remove(config.outputDir)
}

exports.generate = async function () {
    const config = require(`${process.cwd()}/kiss-my-asset.js`)
    genPaths(config.routes).forEach(async route => {
        await genFile(config.outputDir, route.path, route.use)
    })
}

exports.serve = async function () {
    const server = http.createServer((req, res) => {
        const config = requireUncached(`${process.cwd()}/kiss-my-asset.js`)
        const url = req.url.endsWith('/') ? `${req.url}index.html` : req.url
        const route = genPaths(config.routes).filter(r => r.path == url)[0]
        if (route) {
            console.log(200, url)
            try {
                const content = route.use(route.path) 
                res.writeHead(200)
                res.end(content)
                console.log(200, url)
            } catch (err) {
                res.writeHead(500)
                res.end()
                console.log(500, url)
                console.log(err)
            }
        } else {
            res.writeHead(404)
            res.end();
            console.log(404, url)
        }
    })
    server.listen(8080)
}
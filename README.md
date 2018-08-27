# kiss-my-asset

Static site generator bild with [KISS](https://en.wikipedia.org/wiki/KISS_principle) principle.

## install
```sh
npm install kiss-my-asset
```

## configure
Create `kiss-my-asset.js` in root of your project. 
```js
const renderPage = (path) => {
    return `Welcom on page ${path}`
}

const genPaths = () => ['/c.html', '/d.html']

exports.outputDir = '_site'

exports.routes = [
    { path: '/index.html', use: renderPage },
    { path: ['/a.html', '/b.html'], use: renderPage },
    { path: genPaths, use: renderPage }
]
```

## generate
Run in root of your project 
```sh
npx kiss-my-asset generate
```

## dev web server
Run in root of your project 
```sh
npx kiss-my-asset server
```
Web page is available under [http://localhost:8080/](http://localhost:8080/)

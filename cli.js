const yargs = require('yargs')
const internal = require('./index')

yargs.command('generate', 'Generate static site', {}, internal.generate)
yargs.command('clean', 'Clean up', {}, internal.clean)
yargs.command('server', 'Run development server', {}, internal.serve)

yargs.argv

const path = require('path')
const del = require('del')

del.sync([path.join(__dirname, '..', 'dist')])

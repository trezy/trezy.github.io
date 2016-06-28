'use strict'
require('babel-core/register')





let config = require('./config')
let fs = require('fs')
let Koa = require('koa')
let logger = require('kellog')
let path = require('path')





let app = new Koa()

app.name = `Trezy's HTTP Server`
app.use(logger())





app.listen(process.env.PORT || config.http.port)

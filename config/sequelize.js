const Sequelize = require('sequelize')

const env = process.env.NODE_ENV || 'development'
const config = require('./database')[env]

module.exports = new Sequelize(config.url, config)

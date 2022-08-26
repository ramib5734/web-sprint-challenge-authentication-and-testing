require('dotenv').config()

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'Best kept secret youll ever see'
}
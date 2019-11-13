module.exports = {
  development: {
    url: `${process.env.DATABASE_URL}/twinkle_development`,
    dialect: 'postgres'
  },
  production: {
    url: `${process.env.DATABASE_URL}/twinkle`,
    dialect: 'postgres'
  }
}

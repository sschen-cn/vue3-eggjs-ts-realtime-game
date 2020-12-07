// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  assetsDir: 'static',
  productionSourceMap:false,
} 
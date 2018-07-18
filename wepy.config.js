const path = require('path')
var prod = process.env.NODE_ENV === 'production'
let REQUEST_API = 'https://cn.bing.com'
let REQUEST_HOST = 'https://cn.bing.com'
if (prod) {
  REQUEST_API = 'https://cn.bing.com'
  REQUEST_HOST = 'https://cn.bing.com'
}

module.exports = {
  wpyExt: '.wpy',
  eslint: true,
  cliLogs: !prod,
  build: {},
  resolve: {
    alias: {
      counter: path.join(__dirname, 'src/components/counter'),
      '@': path.join(__dirname, 'src')
    },
    aliasFields: ['wepy', 'weapp'],
    modules: ['node_modules']
  },
  compilers: {
    less: {
      compress: prod
    },
    sass: {
      outputStyle: 'compressed'
    },
    babel: {
      sourceMap: true,
      presets: [
        'env'
      ],
      plugins: [
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-object-rest-spread',
        'transform-export-extensions'
      ]
    }
  },
  plugins: {},
  appConfig: {
    noPromiseAPI: ['createSelectorQuery'],
    REQUEST_API: REQUEST_API,
    REQUEST_HOST: REQUEST_HOST,
    DEBUG: !prod,
    VERSION: process.env.npm_package_version
  }
}

if (prod) {
  delete module.exports.compilers.babel.sourcesMap
  // 压缩sass
  module.exports.compilers['sass'] = { outputStyle: 'compressed' }

  // 压缩js
  module.exports.plugins = {
    autoprefixer: {
      filter: /\.(wxss|css)$/,
      config: {
        browsers: ['last 11 iOS versions']
      }
    },
    uglifyjs: {
      filter: /\.js$/,
      config: {}
    },
    imagemin: {
      filter: /\.(jpg|png|jpeg)$/,
      config: {
        jpg: {
          quality: 80
        },
        png: {
          quality: 80
        }
      }
    }
  }
}

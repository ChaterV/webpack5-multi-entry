'use strict'

// 多页面路由

// 配置多页面每个模块的 html 模板 和 webpack入口 js 文件
// 模块的文件夹名作为 key (模块名)
// 不指定 html 模板，每个文件夹下就一个 html 文件
const ENTRY_CONF = {
  'index': {
    // html: 'index.html',
    js: 'index.js'
  },
  'page1': {
    // html: 'page1.html',
    js: 'page1.js'
  },
  'page2': {
    // html: 'page2.html',
    // js: 'index.js'
  },
}

module.exports.ENTRY_CONF = ENTRY_CONF
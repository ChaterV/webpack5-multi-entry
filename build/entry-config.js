'use strict'

// 多页面路由

// 页面列表 - 文件夹名（模块）
const PAGE_ROUTER = [
  {
    name: 'index',    // 文件夹名（模块名） - 对应打包后的页面名
    template: 'index.html', // 指定 html 模板 文件
    entry: 'index.js',  // 指定入口 js 文件
    meta: { // 路由元 信息
      useTemplate: false,     // 是否指定 html 模板
      useEntry: false,        // 是否指定入口 js
      isDevIndexPage: false,   // 是否 为 npm run dev 时默认打开的页面
    },
  },
  {
    name: 'page1',
    template: 'index.html',
    entry: 'index.js',
    meta: {
      useTemplate: false,
      useEntry: false,
      isDevIndexPage: false,
    },
  },
  {
    name: 'page2',
    template: 'index.html',
    entry: 'index.js',
    meta: {
      useTemplate: false,
      useEntry: false,
      isDevIndexPage: true,
    },
  },
]

// 配置多页面每个模块的 html 模板 和 webpack入口 js 文件
// 模块的文件夹名作为 key (模块名)
// 不指定 html 模板，每个文件夹下就一个 html 文件
const ENTRY_CONF = {
  // 'index': {
  //   // html: 'index.html',
  //   js: 'index.js'
  // },
  // 'page1': {
  //   // html: 'page1.html',
  //   js: 'page1.js'
  // },
  // 'page2': {
  //   // html: 'page2.html',
  //   // js: 'index.js'
  // },
}
// 指定html 模板配置
const TEMPLATE_CONF = {}

// 配置 npm run dev 默认打开哪个页面
let DEV_OPEN_PAGE = ''

PAGE_ROUTER.map( v => {
  if (v.meta.useTemplate) {
    TEMPLATE_CONF[v.name] = {
      html: v.template
    }
  }
  if (v.meta.useEntry) {
    ENTRY_CONF[v.name] = {
      js: v.entry
    }
  }
  // 取第一个 isDevIndexPage=true 的页面
  if (v.meta.isDevIndexPage && DEV_OPEN_PAGE === '') {
    DEV_OPEN_PAGE = `${v.name}.html`
  }
})

// console.log('-------')
// console.log('ENTRY_CONF:', ENTRY_CONF)
// console.log('TEMPLATE_CONF:', TEMPLATE_CONF)
// console.log('DEV_OPEN_PAGE:', DEV_OPEN_PAGE)

module.exports.ENTRY_CONF = ENTRY_CONF
module.exports.TEMPLATE_CONF = TEMPLATE_CONF
module.exports.DEV_OPEN_PAGE = DEV_OPEN_PAGE
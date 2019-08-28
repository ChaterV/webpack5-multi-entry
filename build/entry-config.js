'use strict'
// 导入多页面路由配置
const PAGE_ROUTER = require("../page.router").page_router

// 指定每个模块的 webpack入口 js
const ENTRY_CONF = {}
// 指定每个模块的 html 模板
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
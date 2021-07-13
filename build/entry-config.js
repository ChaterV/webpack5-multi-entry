'use strict'
// 导入多页面路由配置
const PAGE_ROUTER = require("../page.router").page_router

// 指定每个模块的 webpack入口 js
const ENTRY_CONF = {}
// 指定每个模块的 html 模板
const TEMPLATE_CONF = {}

PAGE_ROUTER.map( v => {
  TEMPLATE_CONF[v.name] = {
    html: v.template
  }
  ENTRY_CONF[v.name] = {
    js: v.entry
  }
})

module.exports.ENTRY_CONF = ENTRY_CONF
module.exports.TEMPLATE_CONF = TEMPLATE_CONF
// 多页面路由
// 页面列表 - 文件夹名（模块）
const page_router = [
  {
    name: 'pageReact',    // 文件夹名（模块名） - 对应打包后的页面名
    template: 'index.html', // 指定 html 模板 文件
    entry: 'main.js',  // 指定入口 js 文件 默认为index.js
  },
  {
    name: 'pageVue',    // 文件夹名（模块名） - 对应打包后的页面名
    template: 'index.html', // 指定 html 模板 文件
    entry: 'main.js',  // 指定入口 js 文件 默认为index.js
  }
];

module.exports.page_router = page_router;
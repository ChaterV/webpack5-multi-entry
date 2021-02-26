// 多页面路由
// 页面列表 - 文件夹名（模块）
const page_router = [
  {
    name: 'index',    // 文件夹名（模块名） - 对应打包后的页面名
    template: 'index.html', // 指定 html 模板 文件
    entry: 'index.js',  // 指定入口 js 文件
    meta: { // 路由元 信息
      useTemplate: false,     // 是否指定 html 模板
      useEntry: false,        // 是否指定入口 js
      isDevIndexPage: false,   // 是否 为 npm run dev 时默认打开的页面
    }
  },
];

module.exports.page_router = page_router;
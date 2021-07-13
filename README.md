# webpack5搭建 vue3 和 react

基于 webpack5 的多页面 or 单页面配置，同时支持 Vue3 以及 React。

### 特性

- 支持自定义入口


- 支持热更新


- 支持 gzip


- 支持自定义环境变量


- 支持构建时忽略未引用依赖


- 支持 vue3 和 react


- 支持 less 和 sass


- 支持图片(png/jpg)、gif 文件构建时压缩


- 支持 Tailwindcss 


### 使用

```bash
# clone the project
https://github.com/ChaterV/webpack5-multi-entry.git

# enter the project directory
cd webpack5-multi-entry

# install dependency
npm install

# develop
npm start

# production
npm run build

# analyz
npm run analyz
```

### 更新日志

#### 2021.07.13

- 修复 .jsx 文件后缀错误问题

- 入口文件迁移至 entrance 文件夹中

- 简化入口文件配置，默认各入口为 index.js，固定本地开发打开页面为 index 目录（所以务必保证 entrance 文件夹下有 index 页面）

- 依赖更新

- 其他逻辑优化

#### 2021.07.12

- 修复 less 无法编译的问题

- 修复 compression-webpack-plugin 插件编译可能会重名而导致打包失败的问题

#### 2021.05.12

- 依赖更新

#### 2021.04.29

- 升级 Tailwindcss 版本，默认开启 jit 模式，该模式下构建速度更快，文件更小；支持 class 任意值变体。[Just-in-Time ModeTailwind](https://tailwindcss.com/docs/just-in-time-mode)

#### 2021.02.26

- 新增 Tailwindcss 支持，简化环境变量（开发环境和生产环境），具体变量可参考 build -> env.config.js

    - 如不需要 tailwindcss，可删除 package.json 中 tailwindcss依赖项，删除根目录下 tailwind.config.js，删除 postcss.config.js 中 tailwindcss 项。
      
      当然如果项目中没有引入 tailwindcss，在编译和打包时并不会有 tailwindcss 依赖，实际中不进行以上操作也没有影响（代码洁癖者当我没说）
    
    - [tailwind 中文网](https://www.tailwindcss.cn/) （文档可能非最新）

    - [tailwind 英文官网](https://tailwindcss.com/)
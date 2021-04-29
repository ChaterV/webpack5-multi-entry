# webpack5多入口配置

基于 webpack5 的多入口配置，同时支持 Vue3 以及 React。

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

### 2021.04.29

- 升级 Tailwindcss 版本，默认开启 jit 模式，该模式下构建速度更快，文件更小；支持 class 任意值变体。

    - 例如直接写入 class='w-[543px]',那么会被直接编译为 width: 543px; 其他诸如颜色、圆角、背景图均支持。

#### 2021.02.26

- 新增 Tailwindcss 支持，简化环境变量（开发环境和生产环境），具体变量可参考 build -> env.config.js
    - 如不需要 tailwindcss，可删除 package.json 中 tailwindcss依赖项，删除根目录下 tailwind.config.js，删除 postcss.config.js 中 tailwindcss 项。
      当然如果项目中没有引入 tailwindcss，在编译和打包时并不会有 tailwindcss 依赖，实际中不进行以上操作也没有影响（代码洁癖者当我没说）
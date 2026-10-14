# ColdW1ndy.github.io

静态资源分发仓库，通过 GitHub Pages 对外提供一个稳定、可直接引入的 JavaScript 地址。

## 分发地址

```
https://coldw1ndy.github.io/dist/main.js
```

页面入口：<https://coldw1ndy.github.io/>

## 引入方式

浏览器直接引入（会挂载全局变量 `ColdW1ndy`）：

```html
<script src="https://coldw1ndy.github.io/dist/main.js"></script>
<script>
  ColdW1ndy.hello('world'); // 确认脚本已加载
</script>
```

打包器 / ES 模块：

```js
import ColdW1ndy from 'https://coldw1ndy.github.io/dist/main.js';
```

## 缓存穿透

GitHub Pages 的 CDN 缓存约 10 分钟。发布新版本后，在地址后追加变化的查询串即可让使用者立即拿到新文件：

```
https://coldw1ndy.github.io/dist/main.js?v=1.0.0
```

## 目录结构

```
.
├── index.html      落地页：展示分发地址，并自动加载 dist/main.js 验证链路
├── dist/
│   └── main.js     对外分发的脚本（当前为占位实现，可直接替换内容）
├── .nojekyll       关闭 Jekyll 处理，原样发布所有文件
└── README.md
```

## 替换脚本

直接覆盖 `dist/main.js` 的内容即可，无需改动任何配置：

```powershell
# 用你自己的脚本替换占位实现
Copy-Item -Force .\your-script.js .\dist\main.js

git add dist/main.js
git commit -m "Update dist/main.js"
git push
```

推送后约 1 分钟生效。若使用 CDN 或浏览器缓存了旧版本，请配合 `?v=` 查询串访问。

## 维护须知

- 发布源：`main` 分支根目录，GitHub Pages 自动构建，无需 CI。
- 本仓库已放置 `.nojekyll`，文件按原样发布；请勿删除，否则根路径将改由 Jekyll 渲染 `README.md`。
- 仓库根路径由 `index.html` 提供，因此不要依赖 Jekyll 主题渲染 Markdown。
- 本仓库仅存放可公开的静态文件，请勿提交密钥、令牌或任何隐私数据。

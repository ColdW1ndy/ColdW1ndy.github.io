# ColdW1ndy.github.io

静态分发仓库，通过 GitHub Pages 对外提供一个稳定、可直接安装的用户脚本地址。

## 安装地址

```
https://coldw1ndy.github.io/annotator.user.js
```

页面入口：<https://coldw1ndy.github.io/>

地址以 `.user.js` 结尾是必需的：Tampermonkey / ScriptCat 依靠这个后缀拦截浏览器导航并弹出安装界面，换成 `.js` 或其他名字会退化成在浏览器里直接打开源码。

## 使用方式

1. 先安装用户脚本管理器：Tampermonkey 或 ScriptCat。
2. 打开上面的安装地址，确认安装。
3. 首次运行时脚本会提示输入解密密码，该密码由分发者单独提供。

## 缓存穿透

GitHub Pages 的 CDN 缓存约 10 分钟。脚本管理器通常能自行检查更新；需要立刻拿到新版本时，在地址后追加变化的查询串：

```
https://coldw1ndy.github.io/annotator.user.js?v=1.2.4
```

## 目录结构

```
.
├── annotator.user.js   对外分发的用户脚本
├── index.html          落地页：展示安装地址与使用前提
├── .nojekyll           关闭 Jekyll 处理，原样发布所有文件
└── README.md
```

## 更新脚本

脚本本体是「加载器 + 加密负载」结构：元数据块声明匹配站点与 `@version`，正文用 PBKDF2 + AES-CBC 解密内置的 Base64 负载后执行。更新流程：

1. 在本地用加密工具加密新的源码，得到 Base64 密文。
2. 用该密文替换脚本中 `CIPHER_BASE64` 常量的值。
3. 提升元数据块里的 `@version`，否则脚本管理器不会识别为新版本。
4. 提交推送：

```powershell
git add annotator.user.js
git commit -m "Update annotator.user.js"
git push
```

推送后约 1 分钟生效。

## 维护须知

- 发布源：`main` 分支根目录，GitHub Pages 自动构建，无需 CI。
- 本仓库已放置 `.nojekyll`，文件按原样发布；请勿删除，否则根路径将改由 Jekyll 渲染 `README.md`。
- 仓库根路径由 `index.html` 提供，因此不要依赖 Jekyll 主题渲染 Markdown。
- 加密工具 `encrypt.html` 仅存在于本地，已通过 `.git/info/exclude` 排除，不会进入版本库。
- 解密密码不属于仓库内容，不要写进本仓库的任何文件；仓库是公开的。

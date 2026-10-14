/*!
 * main.js — ColdW1ndy GitHub Pages 分发脚本（占位版本，可随时替换）
 *
 * 分发地址: https://coldw1ndy.github.io/dist/main.js
 * 版本:     1.0.0
 * 许可:     MIT
 *
 * 用法（浏览器直接引入）:
 *   <script src="https://coldw1ndy.github.io/dist/main.js"></script>
 *   <script>ColdW1ndy.hello('world');</script>
 *
 * 用法（打包器 / Node）:
 *   import ColdW1ndy from 'https://coldw1ndy.github.io/dist/main.js';
 *
 * 缓存提示: GitHub Pages 的 CDN 缓存约 10 分钟。需要立即拿到新版本时，
 * 在地址后加版本查询串做缓存穿透，例如：
 *   https://coldw1ndy.github.io/dist/main.js?v=1.0.0
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(); // CommonJS / Node
  } else if (typeof define === 'function' && define.amd) {
    define([], factory); // AMD
  } else {
    root.ColdW1ndy = factory(); // <script src> 浏览器全局
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var VERSION = '1.0.0';
  var GLOBAL_NAME = 'ColdW1ndy';
  var previous = null;

  /** 返回当前版本号。 */
  function version() {
    return VERSION;
  }

  /** 打印并返回一句问候，用于确认脚本已成功加载。 */
  function hello(name) {
    var message = 'Hello' + (name ? ', ' + name : '') + '! (' + GLOBAL_NAME + ' v' + VERSION + ')';
    if (typeof console !== 'undefined' && console.log) {
      console.log(message);
    }
    return message;
  }

  /** 交还全局变量名，避免与其他同名脚本冲突。 */
  function noConflict() {
    var scope = typeof globalThis !== 'undefined' ? globalThis : this;
    if (scope && GLOBAL_NAME in scope) {
      scope[GLOBAL_NAME] = previous;
    }
    return api;
  }

  var api = {
    VERSION: VERSION,
    version: version,
    hello: hello,
    noConflict: noConflict
  };

  return api;
});

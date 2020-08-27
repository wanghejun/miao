## css
* sass
* less
* animation.css     动画库
* cubic-bezier.com    贝塞尔曲线
* https://tympanus.net/Tutorials/CSS3SlidingImagePanels/index.html    高级纯css图片轮播
* https://www.webhek.com/apps/species-in-pieces/#     30css动画欣赏
* https://css-tricks.com/snippets/css/a-guide-to-flexbox/      Flex详解
* flexboxfroggy.com   青蛙Flex
* regex101.com    在线RegExp
* regexper.com    RegExp流程图
* highlightjs   高亮代码
* prismjs.com   高亮代码
## js
* lodash.js  常用函数库
* async.js 异步操作库
* codemirror mini代码编辑器(本书作者)       ace editor        monaco editor(微软、vsode)
* electron   js开发桌面级
* express koa  node框架
* pug  express的模板引擎      EJS   也是




# 浏览器跨域设置
* "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir="d:/chrome-disable-web-security/"


* || 返第一个true,没有true就返回最后一个false
* && 返第一个false,没有flase就返回最后一个true
* || && 同时存在,从左往右第二次遇见||就直接返回
* 如果第一个符号是||并且左边第一个为true就直接返回

```js
var a = 0 || 1

var b = 0 && 2

var c = 3 && 2 && 1 && 9

var d = 3 && 2 && '0' && 9

var e = undefined || 0 || '1' || 2

var f = 0 || '0' || undefined || null

var g = 1 && 2 || NaN || 3 && 4

var h = 0 || [] && undefined || {} && 4

var i = 0 || [] && 2 && {} && 4

var j = 0 || NaN && {} && 3 && {} || '5' && 6

var k = 0 && 1 && '' || 2 || undefined && 3 && 0 && NaN && '0' || 1

var l = [] || {} || 0 && true && undefined && null || []




a ?
b ?
c ?
d ?
e ?
f ?
g ?
h ?
i ?
j ?
k ?
l ?

```
* git about https://lhajh.github.io/windows/git/2019/05/05/Window-platform-Git-Bash-configuration.html

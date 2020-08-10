```js
var a = 1 || { a: 1 };
var b = 1 && { a: 1 };
var c = {} || { a: 1 };
var d = {} && { a: 1 };
var e = {} || g;
var f = {} && g;
var h = !a || { a: 1 };




1
{a:1}
{}
{a:1}
{}
undefined
{a:1}

```


```js
如何将 var a=“3.14"; 加 1 得到 4.14

var a = "3.14";
a * 1 + 1(Number(a) + 1).toFixed(2);
```

```js
var scope = "xiaomai";

function fn() {
  console.log(scope);
  scope = "xioamai5";
  console.log(scope);
  var scope = "xiaomaketang"; //这里的var会提前声明，所以第一行输出是undefinde
  console.log(scope);
}

console.log(scope);
fn();

xiaomai;
undefined;
xioamai5;
xiaomaketang;
```

```js
for (let i = 0;i<5;i++){
  setTimeout(function () {
    console.log(i);
  },1000);
}
console.log(i):

报错 i is not definde
0
1
2
3
4
```

```js
var array1 = [1, 2];
var array2 = array1;
array1[0] = array2[1];
array2.push(3);
console.log(array1);
console.log(array2);

array1 = [2, 2, 3];
arayt2 = [2, 2, 3];
```

- 实现字符串去空白

```js
//空白全部消失
String.prototype.trim = function () {
  return this.replace(/ /g, "");
};

//去头尾
String.prototype.trim = function () {
  return this.replace(/^ +/, "").replace(/ +$/, "");
};
```

```js
var A = [
  {
    time: 1525934478939,
    name: 'xiaomai1'
  },{
    time: 1525934478339,
    name: 'xiaomai2'
  }
]

A.sort((a,b) => a.time - b.time)
```




//解析一个url
```js
 function parseURL(url){
    return url.slice(url.indexOf('?')+1).split('&').map(it => it.split('=')).reduce((p,it,idx) => {
      p[it[0]] = it[1]
      return p
    },{})
  }
```



* 从键盘输入URL 开始到页面加载完的过程中都发生了什么事情






* 4.写一个函数将ipv4 地址字符串转化成32位整数，要求处理异常情况并输出合法地址的
32位整型结果。





```js

    function parseIp(ip) { 
      return ip.split('.').map(it => {
        let n = Number(it).toString(2)
        if(n.length < 8){
          n = n.padStart(8,0)
        }
        return n 
      }).join('')
    }
    
```


* 两个数组合并排序
```js
  function concats(aryo,aryt){
    return aryo.concat(aryt).sort((a,b) => a - b)
  }

 function concats2(aryo,aryt){
    let result = []
    let i = 0
    let j = 0
    while(i < aryo.length && j < aryt.length){
      if(aryo[i] >= aryt[j] ){
        result.push(aryt[j++])
        continue
      }
      if(aryt[j] >= aryo[i]){
        result.push(aryo[i++])
      }

    }
      if(i != aryo.length){
        result.push(...aryo.slice(i))
      }
      if(j !=aryo.length){
        result.push(...aryt.slice(j))
      }
    return result
  }
```


```js
`{
  "name":"小明",
  "from":"杭州",
  "like":["看电影","旅游"],
  "sister":[
    {"name":"小芬","age":25,"job":"护士"},
    {"name":"小芳","age":23,"job":"小学老师"}
   ]
  }`
```


* 行类元素  span a b strong i input系列 button
* 块级元素 h1~h6 p div section main header ul li ol table thead tbody th tr td pre
* 空元素 hr img br link meta

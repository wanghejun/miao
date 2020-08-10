// debugger
// function a(num) {
//   console.log(1)
//   return num
//  }
//  a(process.argv[2])
// import {foo} from 'exportest.mjs'
// console.log(foo)

let figlet = require("figlet");

// figlet.text('niewenjun',{
//     font:'Henry 3D'
// },(err,data) => {
//   console.log(data)
// })

function figletPromise(str) {
  return new Promise((resolve, reject) => {
    figlet.text(
      str,
      {
        font: "Henry 3D",
      },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
}

// figletPromise('gan').then(v => {console.log(v)})

async function foo(str) {
  let text = await figletPromise(str);
  console.log(text);
}

foo("gan");

let fs = require("fs");
readFileP("exportest.js", "utf-8").then((v) => {
  console.log(v);
});

//读文件的promise版
function readFileP(...args) {
  return new Promise((resolve, reject) => {
    fs.readFile(...args, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

//读写件的promise版
function writeFileP(...args) {
  return new Promise((resolve, reject) => {
    fs.writeFile(...args, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

//读文件目录的promise版
function readdirP(...args) {
  return new Promise((resolve, reject) => {
    fs.readdir(...args, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

//cb转promise
function promiseify(f) {
  return function () {
    return new Promise((resolve, reject) => {
      f(...args, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };
}

//promise转cb
function callbackify(f) {
  return function (...args) {
    let cb = args.pop();
    f(...args).then(
      (val) => {
        cb(null, val);
      },
      (reason) => {
        cb(reason);
      }
    );
  };
}

function factorize(n) {
  n = Number(n);
  let result = [];

  for (let i = 2; i <= n; i++) {
    if (n % i == 0) {
      result.push(i);
      n = n / i;
      if (n == 1) {
        return result;
      }
      i--;
    }
  }

  return result;
}

console.log(process.argv[2], ":", factorize(process.argv[2]));

// 本地模块导入测试
// let f = require('./exportest')



//列出所有文件
function dir(str) {
  let result = [];
  let arr = fs.readdirSync(str, { withFileTypes: true });

  arr.forEach((it) => {
      
    if (it.isFile()) {
      result.push(path.resolve('./',it.name));
    }else if(it.isDirectory()){
        result.push(...dir(it.name))
    }

  });
//   console.log(result)
  return result;
}

dir("./");

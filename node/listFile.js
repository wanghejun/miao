
let fs = require('fs')
let path = require('path')


//all Files
function listFile(str) { 
  str = path.resolve(str)

  let result = [];
  let arr = fs.readdirSync(str, { withFileTypes: true });


  arr.forEach((it) => {
      
    if (it.isFile()) {
      result.push(path.join(str,it.name));
    }else if(it.isDirectory()){
        result.push(...listFile(path.join(str,it.name)))
    }

  });
  // console.log(result)
  return result;
 }


// let s = listFile("./");
// console.log(s)




//file Tree
function tree(dir,indent = '') { 
  let fullname = path.resolve(dir)

  let arr = fs.readdirSync(dir, { withFileTypes: true });

  arr.forEach(it => {
    if(it.isFile()){
      console.log(indent,it.name)
    }else if(it.isDirectory){
      console.log(indent,it.name,'/')
      tree(path.join(fullname,it.name),indent+='     ')
      indent = ''
    }
  
  })
}

tree('./')

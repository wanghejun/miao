function replaces(reg,string,rep) { 
  var last = 0;
  var result;
  var a = ''
  while(result = reg.exec(string)){
    a+=string.slice(last,result.index);
    last = result[0].length + result.index;
    a+=rep;
  }
  return a+string.slice(last);
 }

function match(reg,Str){
  if(String(reg).search('g') != -1){
    var arr = [];
    var list;
    while(list = reg.exec(Str)){
      arr.push(list[0])
    }
    return arr;
  }else{
    return reg.exec(Str)
  }
}

function search(reg,str){
  return reg.exec(str).index
}

function test(reg,str) { 
  return Boolean(reg.exec(str))
 }

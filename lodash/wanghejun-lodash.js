var wanghejun = {
  chunk:function (arr,size=1) { 
    var result = []
    var arrays = []
    var index = 0
    for (let i = 0; i < arr.length; i++){
      arrays.push(arr[i]);
      index++;
      if (index == size){
        result.push(arrays)
        index = 0;
        arrays = []
      }
    }
    if (arrays.length != 0){
      result.push(arrays)
    }
    return result
   },
   isNull:function (val) { 
     if(val === null){
      return true
     }else{
       return false

     }
    }
}

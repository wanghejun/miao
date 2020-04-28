var wanghejun = {
  /**
   * 将数组分成每组size个
   * @param {Array} arr 被拆分的数组
   * @param {Number} size 每组大小
   * @returns {Array[[]]}
   */
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
      /**
    * 判断一个值是否null
    * @param {*} val 判断的值
    * @returns {boolean}
    */
   isNull:function (val) { 
     if(val === null){
      return true
     }else{
       return false

     }
    },
    compact:function (array) { 
      return array.filter((items)=>{return items > 0})
     },
    /**
     * 
     * @param {Array} array 
     * @param {Array} values 
     */
    concat:function (array,...values) {  
      for (let i of values){
        array = array.concat(i)
      }
      return array
    },
    difference:function (array,...values){
      var result = []
      var arrays = []
      for (let j of values){
        arrays = arrays.concat(j)
      }
      for (let i of array){
            if (!arrays.includes(i)){
              result.push(i)
            }
      }
      return result
    },
    drop:function (array,n=1) { 
      return array.slice(n)
     },
     fill:function (array,str,star=0,end=array.length) { 
        for(let i = star; i < end;i++){
          array[i] = str;
        }
        return array;
      },
      // find:function (param) { 

      //  },
       head:function (array) {
         return array[0];
       },
       flatten:function (array) {
         var arrays = []
         for(let i of array){
           if(i instanceof Array){
             for(let j of i){
               arrays.push(j)
              }
              break;
            }
            arrays.push(i)
         }
         return arrays
       },
       indexOf:function (array,str,star=0) {
         if(isNaN(str)){
          for(let i = star; i<array.length;i++){
            if(isNaN(array[i])){
              return i
            }
          }
         }else{
           for(let i = star; i<array.length;i++){
             if(array[i] == str){
               return i
             }
           }
         }
         return -1
       },
       initial:function (array) {
         return array.slice(0,array.length - 1)
       },
       intersection:function (...array) { 
         var arrays = []
         for(let i of array[0]){
           for(let j = 1;j < array.length;j++){
             if(array[j].includes(i)){
                if(j == array.length - 1){
                arrays.push(i)
                }
             }else{
               break;
             }
           }
         }
         return arrays
        }
      ,
    /**
    * 判断一个值是否null
    * @param {*} val 判断的值
    * @returns {boolean}
    */
   isNull:function (val) { 
    if(val === null){
     return true
    }else{
      return false

    }
   },
}

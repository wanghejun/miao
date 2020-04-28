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
    },/**
     * 
     * @param {Array} array 
     * @param {Array} values 
     */
    concat:function (array,...values) {  
      for (let i of values){
        array = array.concat(i)
      }
      return array
    }
}

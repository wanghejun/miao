var wanghejun = {
  /**
   * 将数组分成每组size个
   * @param {Array} arr 被拆分的数组
   * @param {Number} size 每组大小
   * @returns {Array[[]]}
   */
  chunk: function (arr, size = 1) {
    var result = [];
    var arrays = [];
    var index = 0;
    for (let i = 0; i < arr.length; i++) {
      arrays.push(arr[i]);
      index++;
      if (index == size) {
        result.push(arrays);
        index = 0;
        arrays = [];
      }
    }
    if (arrays.length != 0) {
      result.push(arrays);
    }
    return result;
  },
  /**
   * 判断一个值是否null
   * @param {*} val 判断的值
   * @returns {boolean}
   */
  isNull: function (val) {
    if (val === null) {
      return true;
    } else {
      return false;
    }
  },
  compact: function (array) {
    return array.filter((items) => {
      return items > 0;
    });
  },
  /**
   *
   * @param {Array} array
   * @param {Array} values
   */
  concat: function (array, ...values) {
    for (let i of values) {
      array = array.concat(i);
    }
    return array;
  },
  difference: function (array, ...values) {
    var result = [];
    var arrays = [];
    for (let j of values) {
      arrays = arrays.concat(j);
    }
    for (let i of array) {
      if (!arrays.includes(i)) {
        result.push(i);
      }
    }
    return result;
  },
  drop: function (array, n = 1) {
    return array.slice(n);
  },
  fill: function (array, str, star = 0, end = array.length) {
    for (let i = star; i < end; i++) {
      array[i] = str;
    }
    return array;
  },
  // find:function (param) {

  //  },
  head: function (array) {
    return array[0];
  },
  flatten: function (array) {
    var arrays = [];
    for (let i of array) {
      if (i instanceof Array) {
        for (let j of i) {
          arrays.push(j);
        }
        break;
      }
      arrays.push(i);
    }
    return arrays;
  },
  indexOf: function (array, str, star = 0) {
    if (isNaN(str)) {
      for (let i = star; i < array.length; i++) {
        if (isNaN(array[i])) {
          return i;
        }
      }
    } else {
      for (let i = star; i < array.length; i++) {
        if (array[i] == str) {
          return i;
        }
      }
    }
    return -1;
  },
  initial: function (array) {
    return array.slice(0, array.length - 1);
  },
  intersection: function (...array) {
    var arrays = [];
    for (let i of array[0]) {
      for (let j = 1; j < array.length; j++) {
        if (array[j].includes(i)) {
          if (j == array.length - 1) {
            arrays.push(i);
          }
        } else {
          break;
        }
      }
    }
    return arrays;
  },
  join: function (array, str) {
    var result = "";
    for (let i = 0; i < array.length; i++) {
      if (i == array.length - 1) {
        result += array[i];
        break;
      }
      result = result + array[i] + str;
    }
    return result;
  },
  last: function (array) {
    return array[array.length - 1];
  },
  lastIndexOf: function (array, value, index = 1) {
    if (index < -array.length) {
      return -1;
    }
    if (isNaN(value)) {
      for (let i = array.length - index; i > 0; i--) {
        if (isNaN(array[i])) {
          return i;
        }
      }
    } else {
      for (let i = array.length - index; i > 0; i--) {
        if (array[i] == value) {
          return i;
        }
      }
    }
    return -1;
  },
  nth: function (array, n = 0) {
    if (n < 0) {
      return array[array.length + n];
    }
    return array[n];
  },
  pull: function (array, ...value) {
    var i = 0;
    while (true) {
      if (value.includes(array[i])) {
        array.splice(i, 1);
        i = 0;
      } else if (i == array.length - 1) {
        break;
      } else {
        i++;
      }
    }
    return array;
  },
  pullAll: function (array, value) {
    var i = 0;
    while (true) {
      if (value.includes(array[i])) {
        array.splice(i, 1);
        i = 0;
      } else if (i == array.length - 1) {
        break;
      } else {
        i++;
      }
    }
    return array;
  },
  pullAt: function (array, values) {
    var result = [];
    values.sort((a, b) => {
      return b - a;
    });
    for (let i of values) {
      result.push(...array.splice(i, 1));
    }
    return result.reverse();
  },
  reverse: function (array) {
    var i = 0;
    var j = array.length - 1;
    var box = 0;
    var num = Math.floor(array.length / 2);
    while (num > 0) {
      box = array[i];
      array[i] = array[j];
      array[j] = box;
      i++;
      j--;
      num--;
    }
    return array;
  },
  slice: function (array, star = 0, end = array.length) {
    var arrays = [];
    for (let i = star; i < end; i++) {
      arrays.push(array[i]);
    }
    return arrays;
  },
  sortedIndex: function (array, value) {
    if (array[0] > value) {
      return 0;
    }
    for (let i = 0; i < array.length; i++) {
      if (array[i] <= value && value <= array[i + 1]) {
        return i + 1;
      }
    }
    return array.length;
  },
  sortedIndexOf: function (array, value) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] == value) {
        return i;
      }
    }
    return -1;
  },
  tail: function (array) {
    return array.slice(1);
  },
  take: function (array, n = 1) {
    var arrays = [];
    for (let i = 0; i < n; i++) {
      if (array[i] == undefined) {
        break;
      }
      arrays.push(array[i]);
    }
    return arrays;
  },
  takeRight: function (array, n = 1) {
    var arrays = [];
    var i = array.length - 1;
    while (n > 0) {
      if (array[i] == undefined) {
        break;
      }
      arrays.push(array[i]);
      i--;
      n--;
    }
    return arrays.reverse();
  },
  union: function (...value) {
    var result = [];
    for (let i of value) {
      for (let j of i) {
        if (!result.includes(j)) {
          result.push(j);
        }
      }
    }
    return result;
  },
  uniq: function (array) {
    var result = [];
    for (let i of array) {
      if (!result.includes(i)) {
        result.push(i);
      }
    }
    return result;
  },
  unzip: function (array) {
    var result = [];
    var flag = true;
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].length; j++) {
        if (flag) {
          result.push([]);
          if (j == array[i].length - 1) {
            flag = false;
          }
        }
        result[j].push(array[i][j]);
      }
    }
    return result;
  },
  without: function (array, ...values) {
    var result = [];
    for (let i of array) {
      if (!values.includes(i)) {
        result.push(i);
      }
    }
    return result;
  },
  isNaN: function (val) {
    if (typeof val === "object") {
      return val.toString() === "NaN";
    }
    return val !== val;
  },
  xor: function (...array) {
    var map = {};
    var result = [];
    for (let i of array) {
      for (let j of i) {
        if (j in map) {
          map[j]++;
        } else {
          map[j] = 1;
        }
      }
    }
    for (let i in map) {
      if (map[i] == 1) {
        result.push(Number(i));
      }
    }
    return result;
  },
  zip: function (...array) {
    var result = [];
    var max = 0
    for(let i of array){
      if(i.length > max){
        max = i.length
      }
    }
    for(let i = 0;i < max; i++){
      result.push([]);
    }
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < max; j++) {
        result[j].push(array[i][j]);
      }
    }
    return result;
  },
  /**
   * 判断一个值是否null
   * @param {*} val 判断的值
   * @returns {boolean}
   */
  isNull: function (val) {
    if (val === null) {
      return true;
    } else {
      return false;
    }
  },
};

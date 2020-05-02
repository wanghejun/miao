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
  concat: function (...values) {
    var result = [];
    for (let i of values) {
      if (i instanceof Array) {
        result.push(i[0]);
      } else {
        result.push(i);
      }
    }
    return result;
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
    var max = 0;
    for (let i of array) {
      if (i.length > max) {
        max = i.length;
      }
    }
    for (let i = 0; i < max; i++) {
      result.push([]);
    }
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < max; j++) {
        result[j].push(array[i][j]);
      }
    }
    return result;
  },
  zipObject: function (array, value) {
    var result = {};
    for (let i = 0; i < array.length; i++) {
      result[array[i]] = value[i];
    }
    return result;
  },
  includes: function (list, value, star = 0) {
    if (list instanceof Array) {
      for (let i = star; i < list.length; i++) {
        if (list[i] == value) {
          return true;
        }
      }
      return false;
    } else if (list instanceof Object) {
      for (let i in list) {
        if (list[i] == value) {
          return true;
        }
      }
      return false;
    } else {
      return list.indexOf(value) != -1;
    }
  },
  sample: function (array) {
    return array[Math.floor(Math.random() * (array.length - 1 - 0 + 1) + 0)];
  },
  sampleSize: function (array, n = 1) {
    var result = [];
    if (n > array.length) {
      n = array.length;
    }
    for (let i = 0; i < n; i++) {
      result.push(
        array[Math.floor(Math.random() * (array.length - 1 - 0 + 1) + 0)]
      );
    }
    return result;
  },
  shuffle: function (array) {
    var result = [];
    for (let i of array) {
      result.push(this.sample(array));
    }
    return result;
  },
  size: function (value) {
    if (value instanceof Array) {
      return value.length;
    } else if (value instanceof Object) {
      var num = 0;
      for (let i in value) {
        num++;
      }
      return num;
    } else {
      return value.length;
    }
  },
  eq: function (first, last) {
    if (this.isNaN(first)) {
      return this.isNaN(first) === this.isNaN(last);
    }
    if (first === last) {
      return true;
    } else {
      return false;
    }
  },
  gt: function (value, other) {
    return value > other;
  },
  gte: function (value, other) {
    return value >= other;
  },
  lt: function (value, other) {
    return value < other;
  },
  lte: function (value, other) {
    return value <= other;
  },
  add: function (first, last) {
    return first + last;
  },
  ceil: function (value, pre = 0) {
    if (pre > 0) {
      for (let i = 0; i < pre; i++) {
        value *= 10;
      }
      value = Math.ceil(value);
      for (let i = 0; i < pre; i++) {
        value /= 10;
      }
      return value;
    } else {
      for (let i = pre; i < 0; i++) {
        value /= 10;
      }
      value = Math.ceil(value);
      for (let i = pre; i < 0; i++) {
        value *= 10;
      }
      return value;
    }
  },
  divide: function (first, last) {
    return first / last;
  },
  floor: function (value, pre = 0) {
    if (pre > 0) {
      for (let i = 0; i < pre; i++) {
        value *= 10;
      }
      value = Math.floor(value);
      for (let i = 0; i < pre; i++) {
        value /= 10;
      }
      return value;
    } else {
      for (let i = pre; i < 0; i++) {
        value /= 10;
      }
      value = Math.floor(value);
      for (let i = pre; i < 0; i++) {
        value *= 10;
      }
      return value;
    }
  },
  max: function (array) {
    if (array.length == 0) {
      return undefined;
    }
    var result = array[0];
    for (let i of array) {
      if (i > result) {
        result = i;
      }
    }
    return result;
  },
  mean: function (array) {
    var result = 0;
    for (let i of array) {
      result += i;
    }
    return result / array.length;
  },
  min: function (array) {
    if (array.length == 0) {
      return undefined;
    }
    var result = array[0];
    for (let i of array) {
      if (i < result) {
        result = i;
      }
    }
    return result;
  },
  multiply: function (first, last) {
    return first * last;
  },
  round: function (value, pre = 0) {
    if (pre > 0) {
      for (let i = 0; i < pre; i++) {
        value *= 10;
      }
      value = Math.round(value);
      for (let i = 0; i < pre; i++) {
        value /= 10;
      }
      return value;
    } else {
      for (let i = pre; i < 0; i++) {
        value /= 10;
      }
      value = Math.round(value);
      for (let i = pre; i < 0; i++) {
        value *= 10;
      }
      return value;
    }
  },
  subtract: function (first, last) {
    return first - last;
  },
  sum: function (array) {
    var result = 0;
    for (let i of array) {
      result += i;
    }
    return result;
  },
  // at: function (object, path) {
  //   return path.map((items) => this.property(items)(object));
  // },
  defaults: function (object, ...values) {
    for (let i of values) {
      for (let j in i) {
        if (!(j in object)) {
          object[j] = i[j];
        }
      }
    }
    return object;
  },
  invert: function (object) {
    for (let i in object) {
      object[object[i]] = i;
      delete object[i];
    }
    return object;
  },
  keys: function (object) {
    var result = [];
    for (let i in object) {
      if (object.hasOwnProperty(i)) {
        result.push(i);
      }
    }
    return result;
  },
  omit: function (object, array) {
    var result = {};
    for (let i in object) {
      if (!array.includes(i)) {
        result[i] = object[i];
      }
    }
    return result;
  },
  pick: function (object, array) {
    var result = {};
    for (let i in object) {
      if (array.includes(i)) {
        result[i] = object[i];
      }
    }
    return result;
  },
  values: function (object) {
    var result = [];
    for (let i in object) {
      if (object.hasOwnProperty(i)) {
        result.push(object[i]);
      }
    }
    return result;
  },
  camelCase: function (str) {
    var array = str.match(/[a-z]+/gi);
    var flag = true;
    return array
      .map((items) => {
        if (flag) {
          flag = false;
          return items.toLowerCase();
        } else {
          return items[0].toUpperCase() + items.substring(1).toLowerCase();
        }
      })
      .join("");
  },
  capitalize: function (str) {
    return str[0].toUpperCase() + str.substring(1).toLowerCase();
  },
  endsWith: function (str, end, index = str.length) {
    return str[index - 1] === end;
  },
  escape: function (str) {
    var map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39",
      '"': "&quot",
    };
    return str.replace(/["'<>&]/g, function (items) {
      return (items = map[items]);
    });
  },
  kebabCase: function (str) {
    str = str.toLowerCase();
    return str.match(/[a-z]{1,3}/g).join("-");
  },
  lowerCase: function (str) {
    str = str.toLowerCase();
    return str.match(/[a-z]{1,3}/g).join(" ");
  },
  lowerFirst: function (str) {
    return str[0].toLowerCase() + str.substring(1);
  },
  pad: function (str, length, repeat = " ") {
    var flag = true;
    while (true) {
      if (str.length >= length) {
        break;
      }
      if (flag) {
        str += repeat;
        flag = false;
      } else {
        str = repeat + str;
        flag = true;
      }
    }
    return str.substr(0, length);
  },
  padEnd: function (str, length, repeat = " ") {
    while (true) {
      if (str.length >= length) {
        break;
      }
      str += repeat;
    }
    return str.substr(0, length);
  },
  padStart: function (str, length, repeat = " ") {
    var result = ''
    while (true) {
      if (str.length + result.length >= length) {
        break;
      }
      result = repeat + result;
    }
    if(str.length + result.length > length){
      result = result.substr(0,length - str.length)
    }
    return result + str
  },
  parseInt: function (str, radix = 10) {
    return Number(str).toString(radix) * 1;
  },
  repeat: function (str, n = 0) {
    var result = "";
    for (let i = 0; i < n; i++) {
      result += str;
    }
    return result;
  },
  replace: function (str, pat, rep) {
    return str.replace(pat, rep);
  },
  snakeCase: function (str) {
    str = str.toLowerCase();
    return str.match(/[a-z]{1,3}/g).join("_");
  },
  split: function (str, rep, n) {
    return str.split(rep, n);
  },
  startCase: function (str) {
    str = str.match(/[a-z]{1,3}/gi);
    return str
      .map((items) => {
        return items[0].toUpperCase() + items.substring(1);
      })
      .join(" ");
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

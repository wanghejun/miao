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
  intersectionBy: function (...args) {
    var action = this.make(args[args.length - 1]);
    args.pop();
    var result = [];
    for (let i of args) {
      result.push(i.map((it) => action(it)));
    }

    var arrays = []; //返回
    for (let i = 0; i < result[0].length; i++) {
      for (let j = 1; j < result.length; j++) {
        if (result[j].includes(result[0][i])) {
          if (j == result.length - 1) {
            arrays.push(args[0][i]);
          }
        } else {
          break;
        }
      }
    }
    return arrays;
  },
  intersectionWith: function (fi, la, action) {
    action = this.make(action);
    var result = [];
    for (let i of fi) {
      for (let j = 0; j < la.length; j++) {
        if (action(i, la[j])) {
          if (j == la.length - 1) {
            result.push(i);
            break;
          }
        }
      }
    }
    return result;
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
  pullAllBy: function (arr, values, action) {
    var result = [];
    action = this.make(action);
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < values.length; j++) {
        if (action(arr[i]) === action(values[j])) {
          break;
        } else if (
          action(arr[i]) !== action(values[j]) &&
          j == values.length - 1
        ) {
          result.push(arr[i]);
        }
      }
    }
    return result;
  },
  pullAllWith: function (arr, values, action) {
    let result = [];
    action = this.make(action);
    for (let i of arr) {
      for (let j of values) {
        if (!action(i, j)) {
          result.push(i);
        }
      }
    }
    return result;
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
  sortedIndexBy: function (arr, value, action) {
    action = this.make(action);
    for (let i in arr) {
      if (action(arr[i]) === action(value)) {
        return Number(i);
      }
    }
    return arr.length;
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
  takeRightWhile: function (arr, action, tr = true) {
    var result = [];
    action = this.make(action);
    for (let i = arr.length - 1; i >= 0; i--) {
      if (!action(arr[i])) {
        break;
      }
      if (tr) {
        result.unshift(arr[i]);
      } else {
        result.push(arr[i]);
      }
    }
    return result;
  },
  takeWhile: function (arr, action) {
    return this.takeRightWhile(arr.reverse(), action, false);
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
  unionBy: function (...args) {
    var action = this.make(args.pop());
    args = args.flat();
    var arr = args.map((it) => action(it));
    var result = [];
    for (let i in arr) {
      var index = arr.indexOf(arr[i]);
      if (index != -1 && i == index) {
        result.push(args[i]);
      }
    }
    return result;
  },
  unionWith: function (arr, value, action) {
    action = this.make(action);
    var result = [];

    for (let i of arr) {
      for (let j of value) {
        if (!action(i, j)) {
          result.push(i);
        }
        break;
      }
    }

    for (let i of value) {
      for (let j of arr) {
        if (!action(i, j)) {
          result.push(i);
        }
        break;
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
  unzipWith: function (...arrays) {
    var action = this.make(arrays.pop());

    var arr = [];
    arrays = arrays.flat();
    for (let i in arrays[0]) {
      arr.push([]);
    }

    var result = [];
    for (let i in arrays) {
      for (let j in arrays[i]) {
        arr[j].push(arrays[i][j]);
        if (i == arrays.length - 1) {
          result.push(action(...arr[j]));
        }
      }
    }

    return result;
  },
  zipWith: function (...arrays) {
    var action = arrays.pop();
    var arr = [];
    for (let i in arrays[0]) {
      arr.push([]);
    }
    var result = [];
    for (let i in arrays) {
      for (let j in arrays[i]) {
        arr[j].push(arrays[i][j]);
        if (i == arrays.length - 1) {
          result.push(action(...arr[j]));
        }
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
      return val.__proto__.constructor === Number;
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
  xorBy: function (...args) {
    var action = this.make(args.pop());
    var map = {};
    var result = [];
    args = args.flat();
    args.forEach((it, index) => {
      var val = action(it);
      if (val in map) {
        map[val] = "false";
      } else {
        map[val] = index;
      }
    });
    for (let i in map) {
      if (map[i] != "false") {
        result.push(args[map[i]]);
      }
    }
    return result;
  },
  xorWith: function (fr, la, acton) {
    acton = this.make(acton);
    var result = [];
    for (let i in fr) {
      for (let j in la) {
        if (acton(fr[i], la[j])) {
          break;
        }
        if (!acton(fr[i], la[j]) && j == la.length - 1) {
          result.push(fr[i]);
        }
      }
    }

    for (let i in la) {
      for (let j in fr) {
        if (acton(la[i], fr[j])) {
          break;
        }
        if (!acton(la[i], fr[j]) && j == fr.length - 1) {
          result.push(la[i]);
        }
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
    var result = "";
    while (true) {
      if (str.length + result.length >= length) {
        break;
      }
      result = repeat + result;
    }
    if (str.length + result.length > length) {
      result = result.substr(0, length - str.length);
    }
    return result + str;
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
  startsWith: function (str, star, index = 0) {
    return str.indexOf(star) === index;
  },
  trim: function (str, rep = " ") {
    var i = 0;
    var j = str.length - 1;
    while (i < str.length) {
      if (!rep.includes(str[i])) {
        break;
      }
      i++;
    }
    while (j > 0) {
      if (!rep.includes(str[j])) {
        break;
      }
      j--;
    }
    return str.slice(i, j + 1);
  },
  trimEnd: function (str, rep = " ") {
    var j = str.length - 1;
    while (j > 0) {
      if (!rep.includes(str[j])) {
        break;
      }
      j--;
    }
    return str.slice(0, j + 1);
  },
  trimStart: function (str, rep = " ") {
    var i = 0;
    while (i < str.length) {
      if (!rep.includes(str[i])) {
        break;
      }
      i++;
    }
    return str.slice(i);
  },
  truncate: function (str, object = { length: 30, omission: "..." }) {
    if (object.length === undefined) {
      object.length = 30;
    }
    if (object.omission === undefined) {
      object.omission = "...";
    }
    if (object.separator === undefined) {
      return (
        str.slice(0, object.length - object.omission.length) + object.omission
      );
    }
    str = str.slice(0, object.length);
    var regexp = new RegExp(object.separator, "g");
    var index = true;
    var number = true;
    while (index && number) {
      index = regexp.exec(str);
      if (!index) {
        break;
      }
      number = regexp.exec(str);
      if (!number) {
        break;
      }
    }
    if (!index) {
      return str.slice(0, number.index) + object.omission;
    }
    return str.slice(0, index.index) + object.omission;
  },
  unescape: function (str) {
    var map = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&#39;": "'",
      "&quot;": '"',
    };
    return str.replace(/&\w+;/g, function (items) {
      return (items = map[items]);
    });
  },
  upperCase: function (str) {
    str = str.match(/[a-z]{1,3}/gi);
    return str
      .map((items) => {
        return items.toUpperCase();
      })
      .join(" ");
  },
  upperFirst: function (str) {
    if (str[0].charCodeAt() > 96) {
      return String.fromCharCode(str[0].charCodeAt() - 32) + str.substr(1);
    }
    return str;
  },
  words: function (str, regexp = /\w+/g) {
    return str.match(regexp);
  },
  range: function (...array) {
    var result = [];
    var star = 0;
    var end = 0;
    var step = 1;
    if (array.length == 1) {
      end = array[0];
      if (end < 0) {
        step = -1;
      }
    }
    if (array.length == 2) {
      star = array[0];
      end = array[1];
    }
    if (array.length == 3) {
      star = array[0];
      end = array[1];
      step = array[2];
    }
    if (step == 0) {
      var index = star;
      for (let i = star; i < end; i++) {
        result.push(index);
      }
      return result;
    }
    if (end >= 0) {
      for (let i = star; i < end; i += step) {
        result.push(i);
      }
      return result;
    }
    for (let i = star; i > end; i += step) {
      result.push(i);
    }
    return result;
  },
  dropRight: function (array, n = 1) {
    var result = [...array];
    for (let i = 0; i < n; i++) {
      result.pop();
    }
    return result;
  },
  dropRightWhile: function (arr, action) {
    let makes = (value) => {
      if (typeof value === "string") {
        return (it) => value in it;
      }
      if (typeof value === "function") {
        return value;
      }
      if (value instanceof Array) {
        return (it) => {
          var i = value[0];
          var j = value[1];
          return it[i] === j;
        };
      }
      if (value instanceof Object) {
        return (it) => {
          for (let i in value) {
            if (it[i] !== value[i]) {
              return false;
            }
          }
          return true;
        };
      }
    };
    action = makes(action);
    for (let i = arr.length - 1; i >= 0; i--) {
      if (!action(arr[i])) {
        arr.splice(i + 1, arr.length);
        break;
      }
    }
    return arr;
  },
  dropWhile: function (arr, action) {
    let makes = (value) => {
      if (typeof value === "string") {
        return (it) => value in it;
      }
      if (typeof value === "function") {
        return value;
      }
      if (value instanceof Array) {
        return (it) => {
          var i = value[0];
          var j = value[1];
          return it[i] === j;
        };
      }
      if (value instanceof Object) {
        return (it) => {
          for (let i in value) {
            if (it[i] !== value[i]) {
              return false;
            }
          }
          return true;
        };
      }
    };
    action = makes(action);
    for (let i in arr) {
      if (!action(arr[i])) {
        arr.splice(0, i);
        break;
      }
    }
    return arr;
  },
  fill: function (array, str, star = 0, end = array.length) {
    var result = [...array];
    for (let i = star; i < end; i++) {
      result[i] = str;
    }
    return result;
  },
  flattenDeep: function (ary) {
    for (let i = 0; i < ary.length; i++) {
      if (ary[i] instanceof Array) {
        var value = ary.splice(i, 1);
        ary.splice(i, 0, ...value[0]);
      }
    }
    return ary;
  },
  flattenDepth: function (ary, depth = 1) {
    for (let i = 0; i < depth; i++) {
      var j = 0;
      while (j < ary.length) {
        if (ary[j] instanceof Array) {
          var value = ary.splice(j, 1);
          ary.splice(j, 0, ...value[0]);
          j += value[0].length - 1;
        }
        j++;
      }
    }
    return ary;
  },
  fromPairs: function (array) {
    var result = {};
    for (let [key, value] of array) {
      result[key] = value;
    }
    return result;
  },
  toPairs: function (object) {
    var result = [];
    for (let i in object) {
      if (object.hasOwnProperty(i)) {
        result.push([i, object[i]]);
      }
    }
    return result;
  },
  sortedLastIndex: function (array, value) {
    for (let i = array.length - 1; i >= 0; i--) {
      if (array[i] <= value && value < array[i + 1]) {
        return i + 1;
      }
    }
    return -1;
  },
  sortedLastIndexBy: function (arr, value, action) {
    action = this.make(action);
    for (let i in arr) {
      if (action(arr[i]) > action(value)) {
        return Number(i);
      }
    }
    return arr.length;
  },
  sortedLastIndexOf: function (array, value) {
    for (let i = array.length - 1; i >= 0; i--) {
      if (array[i] === value) {
        return i;
      }
    }
    return -1;
  },
  sortedUniq: function (array) {
    return new Array(
      ...new Set(
        array.sort((a, b) => {
          return a - b;
        })
      )
    );
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
  castArray: function (value) {
    if (value instanceof Array) {
      return value;
    } else if (arguments.length == 0) {
      return [];
    } else {
      return [value];
    }
  },
  differenceBy: function (array, ...values) {
    var ft = values[values.length - 1];
    var result = [];
    if (Array.isArray(ft)) {
      values = values.flat();
      return this.difference(array, values);
    }
    if (typeof ft === "function") {
      values = values.flat();
      values = values.slice(0, values.length - 1);
      values = values.map((item) => {
        return ft(item);
      });
      for (let i of array) {
        if (!values.includes(ft(i))) {
          result.push(i);
        }
      }
    }
    if (typeof ft === "string") {
      values = values.flat().slice(0, values.length - 1);
      for (let i of array) {
        if (!(i[ft] === values[0][ft])) {
          result.push(i);
        }
      }
    }
    return result;
  },
  differenceWith: function (array, ...values) {
    var ft = values[values.length - 1];
    values = values.flat();
    values = values.slice(0, values.length - 1);
    for (let i = 0; i < array.length; i++) {
      if (ft(array[i], values[0])) {
        array.splice(i, 1);
      }
    }
    return array;
  },
  isEqual: function (first, last) {
    if (Array.isArray(first) && !Array.isArray(last)) {
      return false;
    }
    if (typeof first == "object" || typeof last == "object") {
      if (first.length > last.length) {
        for (let i in first) {
          if (typeof first[i] == "object") {
            return this.isEqual(first[i], last[i]);
          }
          if (first[i] !== last[i]) {
            return false;
          }
        }
        return true;
      } else {
        for (let i in last) {
          if (typeof first[i] == "object") {
            return this.isEqual(first[i], last[i]);
          }
          if (last[i] !== first[i]) {
            return false;
          }
        }
        return true;
      }
    } else {
      return first === last;
    }
  },
  sortedUniqBy: function (array, fun) {
    var map = {};
    var result = [];
    array.forEach((element) => {
      var value = fun(element);
      if (!(value in map)) {
        map[value] = element;
      }
    });
    for (let i in map) {
      result.push(Number(map[i]));
    }
    return result;
  },
  conformsTo: function (object, value) {
    for (let i in value) {
      return value[i](object[i]);
    }
  },
  isArguments: function (value) {
    return value.toString() === "[object Arguments]";
  },
  isArray: function (value) {
    return value instanceof Array;
  },
  isArrayBuffer: function (value) {
    return value.toString() === "[object ArrayBuffer]";
  },
  isArrayLike: function (value) {
    if (
      typeof value != "function" &&
      value.length >= 0 &&
      value.length <= Number.MAX_SAFE_INTEGER
    ) {
      return true;
    }
    return false;
  },
  isArrayLikeObject: function (value) {
    if (
      typeof value == "object" &&
      value.length >= 0 &&
      value.length <= Number.MAX_SAFE_INTEGER
    ) {
      return true;
    }
    return false;
  },
  isBoolean: function (value) {
    if (value === null) {
      return false;
    }
    return value.__proto__.constructor == Boolean;
  },
  isDate: function (value) {
    return value.__proto__.constructor == Date;
  },
  isElement: function (value) {
    if (value === null) {
      return false;
    }
    return value.__proto__.constructor == HTMLBodyElement;
  },
  isEmpty: function (value) {
    for (let i in value) {
      return false;
    }
    return true;
  },
  isError: function (value) {
    return value.__proto__.constructor == Error;
  },
  isFinite: function (value) {
    if (
      typeof value === "number" &&
      value >= Number.MIN_VALUE &&
      value <= Number.MAX_VALUE
    ) {
      return true;
    }
    return false;
  },
  isFunction: function (value) {
    return typeof value === "function";
  },
  isInteger: function (value) {
    return this.isFinite(value) && value % 1 === 0;
  },
  isLength: function (value) {
    if (typeof value === "number" && value >= 2 && value <= Number.MAX_VALUE) {
      return true;
    }
    return false;
  },
  isMap: function (value) {
    return value.__proto__.constructor == Map;
  },
  isMatch: function (object, value) {
    for (let i in value) {
      return this.isEqual(object[i], value[i]);
    }
  },
  isNative: function (value) {
    return value.toString().includes("[native code]");
  },
  isNil: function (value) {
    return value === null || value === undefined;
  },
  isNumber: function (value) {
    return typeof value === "number";
  },
  isObject: function (value) {
    return value instanceof Object;
  },
  isObjectLike: function (value) {
    if (value != null && typeof value === "object") {
      return true;
    }
    return false;
  },
  isPlainObject: function (value) {
    return value.__proto__ === null || value.__proto__.constructor === Object;
  },
  isRegExp: function (value) {
    return value.__proto__.constructor === RegExp;
  },
  isSafeInteger: function (value) {
    return Number.isSafeInteger(value);
  },
  isSet: function (value) {
    return value.__proto__.constructor === Set;
  },
  isString: function (value) {
    return value.__proto__.constructor === String;
  },
  isSymbol: function (value) {
    return value.__proto__.constructor === Symbol;
  },
  isTypedArray: function (value) {
    return value.__proto__.constructor === Uint8Array;
  },
  isUndefined: function (value) {
    return value === undefined;
  },
  isWeakMap: function (value) {
    return value.__proto__.constructor === WeakMap;
  },
  isWeakSet: function (value) {
    return value.__proto__.constructor === WeakSet;
  },
  toArray: function (value) {
    let result = [];
    for (let i in value) {
      result.push(value[i]);
    }
    return result;
  },
  toFinite: function (value) {
    if (value === Infinity) return Number.MAX_VALUE;
    if (value === -Infinity) return Number.MIN_VALUE;
    return Number(value);
  },
  toInteger: function (value) {
    if (value === Infinity) {
      return Number.MAX_VALUE;
    }
    return Math.trunc(value);
  },
  toLength: function (value) {
    value = this.toInteger(value);
    if (value < 0) {
      return 0;
    }
    if (value > Math.pow(2, 32) - 1) {
      return Math.pow(2, 32) - 1;
    }
    return value;
  },
  toNumber: function (value) {
    return Number(value);
  },
  toSafeInteger: function (value) {
    value = this.toInteger(value);
    if (value < 0) {
      return 0;
    }
    if (value > Number.MAX_SAFE_INTEGER) {
      return Number.MAX_SAFE_INTEGER;
    }
    return value;
  },
  assign: function (object, ...value) {
    for (let i of value) {
      for (let j in i) {
        if (i.hasOwnProperty(j)) {
          object[j] = i[j];
        }
      }
    }
    return object;
  },
  toLower: (value) => value.toLowerCase(),
  toUpper: (value) => value.toUpperCase(),
  defaultTo: function (value, defaultValue) {
    if (this.isNaN(value) || this.isNil(value)) {
      return defaultValue;
    }
    return value;
  },
  clamp: (value, lower, upper) => {
    if (value < lower) {
      return lower;
    } else if (value > upper) {
      return upper;
    }
    return value;
  },
  inRange: (...values) => {
    if (values.length == 2) {
      if (values[1] < 0) {
        return values[0] >= values[1] && values[0] < 0;
      }
      return values[0] >= 0 && values[0] < values[1];
    } else {
      if (values[1] < 0) {
        return values[0] >= values[2] && values[0] < values[1];
      }
      return values[0] >= values[1] && values[0] < values[2];
    }
  },
  // random:(...values) => {
  //   if(values.length == 1){
  //     return Math.floor( Math.random() * (values[0] - 0 + 1) + 0)
  //   }
  // }
  make: (value) => {
    if (typeof value === "string") {
      return (it) => it[value];
    }
    if (typeof value === "function") {
      return value;
    }
    if (value instanceof Array) {
      return (it) => {
        var i = value[0];
        var j = value[1];
        return it[i] === j;
      };
    }
    if (value instanceof Object) {
      return (it) => {
        for (let i in value) {
          if (it[i] !== value[i]) {
            return false;
          }
        }
        return true;
      };
    }
  },
  keyBy: function (arr, action) {
    action = this.make(action);
    return arr.reduce((a, b) => {
      a[action(b)] = b;
      return a;
    }, {});
  },
  groupBy: function (arr, action) {
    var result = {};
    action = this.make(action);
    arr.forEach((it) => {
      var key = action(it);
      if (!(key in result)) {
        result[key] = [];
      }
      result[key].push(it);
    });
    return result;
  },
  findIndex: function (arr, action, from = 0) {
    action = this.make(action);
    var index = 0;
    for (let i = from; i < arr.length; i++) {
      if (action(arr[i])) {
        index = i;
        break;
      }
    }
    return index;
  },
  findLastIndex: function (arr, action, from = arr.length - 1) {
    action = this.make(action);
    var index = -1;
    for (let i = from; i >= 0; i--) {
      if (action(arr[i])) {
        index = i;
        break;
      }
    }
    return index;
  },
  before: function (n, func) {
    var i = 0;
    var result;
    return function (...args) {
      if (i < n) {
        i++;
        result = func;
      }
      return result;
    };
  },
  after: function (n, func) {
    var i = 0;
    var result;
    return function (...args) {
      i++;
      if (i > n) {
        result = func;
      }
      return result(...args);
    };
  },
  ary: function (func, n = func.length) {
    return function (...args) {
      return func(...args.slice(0, n));
    };
  },
  unary: function (func) {
    return function (args) {
      return func(args);
    };
  },
  flip: function (func) {
    return function (...args) {
      return func(...args.reverse());
    };
  },
  negate: function (func) {
    return function (...args) {
      return !func(...args);
    };
  },
  spread: function (func) {
    return function (args) {
      return func(...args);
    };
  },
  reject: function (ary, test) {
    return this.filter(ary, this.negate(test));
  },
};
// function (ary) {
//   for(let i = 0;i < ary.length;i++){
//     if(ary[i] instanceof Array){
//       var value = ary.splice(i,1)
//       ary.splice(i,0,...value[0])
//     }
//   }
//   return ary
//  }
//  function (ary,depth = 1) {
//    for(let i = 0; i < depth;i++){
//     var j = 0
//     while(j < ary.length){
//       if(ary[j] instanceof Array){
//         var value = ary.splice(j,1)
//         ary.splice(j,0,...value[0])
//         j += value[0].length - 1
//       }
//       j++
//     }
//    }
//    return ary
//   }
function avg(a, b, c, d) {
  if (c == d.length - 1) {
    return (a + b) / d.length;
  }
  return a + b;
}
function every(ary, test) {
  for (let i = 0; i < ary.length; i++) {
    if (!test(ary[i])) {
      return false;
    }
  }
  return true;
}
function every(ary, test) {
  ary.reduce((a, b, c, d) => {
    if (!test(a)) {
      return false;
    }
  });
}

function some(ary, test) {
  for (let i = 0; i < ary.length; i++) {
    if (test(ary[i])) {
      return true;
    }
  }
  return false;
}

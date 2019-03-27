/* 数组对象相关 */
/**
 * @function isArray
 * @memberOf pbFunc
 * @ngdoc function
 * @description 是否是数组
 * @param  {object}  data [需要检测的对象]
 * @return {Boolean}      [返回是否是数组]
 */
export const isArray = function(data) {
  return Array.isArray(data)
}
/**
 * @function inArray
 * @memberOf pbFunc
 * @ngdoc function
 * @description 是否存在数组中
 * @param  {any}  needle [需要检测的值]
 * @param  {array}  arr [需要检测的数组]
 * @return {Boolean}      [返回是否在数组中]
 */
export const inArray = function(needle, arr) {
  let isFound = false
  for (let i = 0, imax = arr.length; i < imax; i++) {
    if (arr[i] === needle) {
      isFound = true
      break
    }
  }
  return isFound
}
/**
 * @function inObjName
 * @memberOf pbFunc
 * @ngdoc function
 * @description 是否存在于对象属性中
 * @param  {*} needle [需要检查的内容]
 * @param  {string} name   [对象的属性名称]
 * @param  {object} obj    [需要检查的对象]
 * @returns {boolean}        [返回是否存在]
 */
export const inObjName = function(needle, name, obj) {
  /**
   * 键值
   * @type {number}
   */
  var i
  for (i in obj) {
    if (needle === obj[i][name]) {
      return true
    }
  }
  return false
}

/**
 * @function objToArrStr
 * @memberOf pbFunc
 * @ngdoc function
 * @description 把对象中某种属性转成数组join的字符串
 * @param  {object} obj  [需要转换的对象]
 * @param  {string} prop [对象的属性名称]
 * @returns {string}      [返回数组join的字符串]
 */
export const objToArrStr = function(obj, prop) {
  /**
   * 需要处理的数组对象
   * @type {array}
   */
  var arr = []
  /**
   * 键值
   * @type {number}
   */
  var i
  for (i in obj) {
    if (obj[i][prop] !== undefined) {
      arr.push(obj[i][prop])
    }
  }
  return arr.join(',')
}

/**
 * @function objByKeyToArr
 * @memberOf pbFunc
 * @ngdoc function
 * @description 把对象中某种属性转成数组
 * @param  {object} obj  [需要转换的对象]
 * @param  {string} prop [对象的属性名称]
 * @returns {array}      [返回匹配属性的数组]
 */
export const objByKeyToArr = function(obj, prop) {
  /**
   * 需要处理的数组对象
   * @type {array}
   */
  var arr = []
  /**
   * 键值
   * @type {number}
   */
  var i
  for (i in obj) {
    if (obj[i][prop] !== undefined) {
      arr.push(obj[i][prop])
    }
  }
  return arr
}
/**
 * @function arrToObj
 * @memberOf pbFunc
 * @ngdoc function
 * @description 数组转可选标注的对象
 * @param  {array}   selectedArr [需要检测的数组]
 * @param  {array}   arr         [需要遍例的数组]
 * @param  {string}   keyName     [属性名称]
 * @param  {Function} cb          [判断是否可选的回调函数]
 * @returns {object}               [返回标注可选的对象]
 *
 */
export const arrToObj = function(selectedArr, arr, keyName, cb) {
  /**
   * 对象
   * @type {object}
   */
  var objList = {}
  /**
   * 键值
   * @type {number}
   */
  var i
  for (i in arr) {
    objList[i] = {
      keyName: arr[i],
      id: i,
      isSelected: !!cb(arr, selectedArr, keyName, i)
    }
  }
  return objList
}
/**
 * @function arrToObjWithKey
 * @memberOf pbFunc
 * @ngdoc function
 * @description 数组转对象带Key
 * @param  {array}   selectedObj [需要检测的对象]
 * @param  {array}   arr         [需要遍例的数组]
 * @param  {string}   keyName     [属性名称]
 * @param  {Function} cb          [判断是否可选的回调函数]
 * @returns {object}               [返回标注可选的对象]
 *
 */
export const arrToObjWithKey = function(selectedObj, arr, keyName, cb) {
  /**
   * 对象
   * @type {object}
   */
  var objList = {}
  /**
   * 键值
   * @type {number}
   */
  var i
  /**
   * 同一个键值的数组
   * @type {string}
   */
  var selectedArr = objByKeyToArr(selectedObj, keyName)
  for (i in arr) {
    /**
     * 序号
     * @type {string}
     */
    var xh = arr[i].id.toString()
    objList[xh] = {
      name: arr[i][keyName],
      id: xh,
      isSelected: !!cb(arr, selectedArr, keyName, i)
    }
  }
  return objList
}
/**
 * @function objPushToArr
 * @memberOf pbFunc
 * @ngdoc function
 * @description 对象中某个key加入到数组
 * @param  {string} submitData [提交的字符串]
 * @param  {object} obj        [需要检查的对象]
 * @param  {string} field      [需要检查的对象包含的字段]
 * @returns {array}            [返回数组]
 */
export const objPushToArr = function(submitData, obj, field) {
  /**
   * 需要处理的数组对象
   * @type {array}
   */
  var selectedArr = []
  /**
   * 键值
   * @type {number}
   */
  var i
  if (obj.length > 0 && typeof submitData === 'string') {
    /**
     * 逗号分隔的数组
     * @type {array}
     */
    var submitDataArr = submitData.split(',')
    for (i in obj) {
      /**
       * 名称
       * @type {string}
       */
      var name = obj[i][field]
      /**
       * ID
       * @type {string}
       */
      var id = obj[i]['id']
      if (inArray(name, submitDataArr)) {
        selectedArr.push(id)
      }
    }
  }
  return selectedArr
}
/**
 * @function isEmptyObj
 * @memberOf pbFunc
 * @ngdoc function
 * @description 对象是否为空
 * @param  {object} listObj        [需要检查的对象]
 * @returns {number}            [返回整数表示长度]
 */
export const isEmptyObj = function(listObj) {
  /**
   * 初始化对象长度为零
   * @type {number}
   */
  var len = 0
  if (typeof listObj !== 'object') return len
  for (var i in listObj) {
    if (listObj[i] !== null || listObj[i] !== undefined) {
      len++
    }
  }
  return len
}

/**
 * @function objSize
 * @memberOf pbFunc
 * @ngdoc function
 * @description 获取对象大小
 * @param  {object} trg [需要检查的对象]
 */
export const objSize = function(trg) {
  if (typeof trg !== 'object' || trg === null) return 0
  /**
   * 计数器
   * @type {Number}
   */
  var i = 0

  /* eslint-disable */
  for (var t in trg) {
    i++
  }
  /* eslint-enable */

  return i // Object.keys(trg).length;
}
/**
 * @function chkObjLen
 * @memberOf pbFunc
 * @ngdoc function
 * @description 检查对象长度
 * @param  {object} trg [需要检查的对象]
 * @param  {number} size [预估长度]
 * @returns  {boolean}  [返回真假]
 */
export const chkObjLen = function(obj, size) {
  if (objSize(obj) === size) {
    return true
  } else {
    return false
  }
}

/**
 * @function getObjFromArrByKey
 * @memberOf pbFunc
 * @ngdoc function
 * @description 通过数组中对象的键值返回相应的对象
 * @param  {string} name [数组中对象的键值名称]
 * @param  {*} value [数组中对象的键值所对应的值]
 * @returns {object}      [返回相应的对象]
 */
export const getObjFromArrByKey = function(arr, name, value) {
  /**
   * 初始化对象
   * @type {object}
   */
  var obj = {}
  if (!isArray(arr)) return obj
  for (var i = 0, imax = arr.length; i < imax; i++) {
    if (arr[i].hasOwnProperty(name) && arr[i][name] === value) {
      obj = arr[i]
      break
    }
  }
  return obj
}

/**
 * @function delObjKey
 * @memberOf pbFunc
 * @ngdoc function
 * @description 删除对象属性]
 * @param  {object} obj [目标对象]
 * @param  {object} key [目标键值]
 * @return {object}     [返回找到的对象]
 */
export const delObjKey = function(obj, key) {
  var newFileListObj
  if (typeof obj === 'object') {
    if (obj.constructor === Array) {
      newFileListObj = []
      for (var j = 0, jmax = obj.length; j < jmax; j++) {
        if (obj[j].key !== key) {
          newFileListObj.push(obj[j])
        }
      }
    } else {
      newFileListObj = {}
      for (var t in obj) {
        if (obj.hasOwnProperty(t) && t !== key) {
          newFileListObj[t] = obj[t]
        }
      }
    }
  }
  return newFileListObj
}
/**
 * @function objValues
 * @memberOf pbFunc
 * @ngdoc function
 * @description 数组对象中相同键值提取成数组]
 * @param  {object} obj [目标对象]
 * @return {object}     [相同键值提取成数组]
 */
export const objValues = function(obj) {
  var values = []
  for (var t in obj) {
    if (obj.hasOwnProperty(t)) {
      values.push(obj[t])
    }
  }
  return values
}
/**
 * @function objKeys
 * @memberOf pbFunc
 * @ngdoc function
 * @description 对象键值数组]
 * @param  {object} obj [目标对象]
 * @return {object}     [键值数组]
 */
export const objKeys = function(obj) {
  var values = []
  for (var t in obj) {
    if (obj.hasOwnProperty(t)) {
      values.push(t)
    }
  }
  return values
}

/**
 * @function deepcopy
 * @memberOf pbFunc
 * @ngdoc function
 * @description 深拷贝]
 * @param  {object}/{array}  source [目标对象]
 * @return {object}/{array}         [目标对象]
 */
export const deepcopy = function(source) {
  if (!source) {
    return source
  }
  let sourceCopy = source instanceof Array ? [] : {}
  for (let item in source) {
    sourceCopy[item] =
      typeof source[item] === 'object' ? deepcopy(source[item]) : source[item]
  }
  return sourceCopy
}

export const fifterObjIsNull = function(Obj) {
  var object = deepcopy(Obj)

  var isEmpty = function(object) {
    for (var name in object) {
      return false
    }
    return true
  }

  for (var i in object) {
    var value = object[i]
    if (value && typeof value === 'object') {
      if (Array.isArray(value)) {
        if (value.length === 0) {
          delete object[i]
          continue
        } else {
          for (let j = 0; j < value.length; j++) {
            if (value[j] && typeof value[j] === 'object') {
              value[j] = fifterObjIsNull(value[j])
            }
          }
        }
      }
      value = fifterObjIsNull(value)
      if (isEmpty(value)) {
        delete object[i]
      }
    } else {
      if (value === '' || value === null || value === undefined) {
        delete object[i]
      }
    }
  }
  return object
}

export const fifterbyArr = function(Obj, fifterArr, isNull) {
  var object = deepcopy(Obj)
  var newObj = {}
  if (isNull) {
    if (isNull === 'empty') {
      for (let i = 0; i < fifterArr.length; i++) {
        newObj[fifterArr[i]] = object[fifterArr[i]] ? object[fifterArr[i]] : ''
      }
    } else {
      for (let i = 0; i < fifterArr.length; i++) {
        newObj[fifterArr[i]] = object[fifterArr[i]]
      }
    }
  } else {
    for (let i = 0; i < fifterArr.length; i++) {
      newObj[fifterArr[i]] = object[fifterArr[i]] ? object[fifterArr[i]] : null
    }
  }
  return newObj
}

export const dealNullData = function(data) {
  if (data === null || data === undefined || data === '') {
    return '<span class="text-stance">无</span>'
  } else {
    return data
  }
}
export const format = function() {
  /* eslint-disable */
  Date.prototype.Format = function(fmt) {
    // author: meizz
    var o = {
      'M+': this.getMonth() + 1, // 月份
      'd+': this.getDate(), // 日
      'h+': this.getHours(), // 小时
      'm+': this.getMinutes(), // 分
      's+': this.getSeconds(), // 秒
      'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
      S: this.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (this.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
    return fmt
  }
  /* eslint-enable */
}
/**
 * [tab 日期比较大小]
 * @param  {[type]} date1 [description]
 * @param  {[type]} date2 [description]
 * @return {[type]}       [description]
 */
export const compareDate = function(date1, date2) {
  var oDate1 = new Date(date1)
  var oDate2 = new Date(date2)
  if (oDate1.getTime() > oDate2.getTime()) {
    return false
  } else {
    return true
  }
}

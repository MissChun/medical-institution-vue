/* 缓存相关 */

/**
 * @function setLocalData
 * @memberOf pbFunc
 * @ngdoc function
 * @description 本地存储数据
 * @param  {string} storageKey [基于local/sessionStorage存储的key值]
 * @param  {string} storageValue [基于local/sessionStorage存储的value值]
 * @param {boolean} isPermanent [是否永久保存]
 * @returns {boolean} [是否成功]
 * @see {@link pbFunc.getLocalData}
 * @see {@link pbFunc.delLocalData}
 */
export const setLocalData = function(storageKey, storageValue, isPermanent) {
  /**
   * [是否永久保存]
   * @type {boolean}
   */
  var _isPermanent = typeof isPermanent === 'boolean' ? isPermanent : false
  /**
   * [本地存储对象]
   * @type {objecy}
   */
  var windowStorageObj = _isPermanent
    ? window.localStorage
    : window.sessionStorage
  // console.log('setLocalData', storageKey);
  try {
    // windowStorageObj.setItem(storageKey, angular.toJson(storageValue));
    windowStorageObj.setItem(storageKey, JSON.stringify(storageValue))
    return true
  } catch (errStorageObj) {
    // if (isLoging) throw new Error('Storage数据失败! [' + errStorageObj.toString() + ']');
    return false
  }
  // return false;
}
/**
 * @function getLocalData
 * @memberOf pbFunc
 * @ngdoc function
 * @description 获取本地存储数据
 * @param  {string} storageKey [基于local/sessionStorage存储的key值]
 * @param {boolean} isPermanent [是否永久保存]
 * @returns  {string|boolean}  [返回基于local/sessionStorage存储的value值]
 * @see {@link pbFunc.setLocalData}
 * @see {@link pbFunc.delLocalData}
 */
export const getLocalData = function(storageKey, isPermanent) {
  /**
   * [是否永久保存]
   * @type {boolean}
   */
  var _isPermanent = typeof isPermanent === 'boolean' ? isPermanent : false
  /**
   * [本地存储对象]
   * @type {objecy}
   */
  var windowStorageObj = _isPermanent
    ? window.localStorage
    : window.sessionStorage
  // if (pbDebug) console.log('getLocalData', storageKey);
  try {
    if (storageKey in windowStorageObj) {
      // return angular.fromJson(windowStorageObj.getItem(storageKey));
      return JSON.parse(windowStorageObj.getItem(storageKey))
    }
  } catch (errStorageObj) {
    // if (isLoging) throw new Error('Storage数据失败! [' + errStorageObj.toString() + ']');
    return false
  }
  // return null;
}
/**
 * @function delLocalData
 * @memberOf pbFunc
 * @ngdoc function
 * @description 删除本地存储数据
 * @param  {string} storageKey [基于local/sessionStorage存储的key值]
 * @param  {function} cb [删除后回调]
 * @param {boolean} isPermanent [是否永久保存]
 * @see {@link pbFunc.setLocalData}
 * @see {@link pbFunc.getLocalData}
 */
export const delLocalData = function(storageKey, cb, isPermanent) {
  /**
   * [是否永久保存]
   * @type {boolean}
   */
  var _isPermanent = typeof isPermanent === 'boolean' ? isPermanent : false
  /**
   * [本地存储对象]
   * @type {objecy}
   */
  var windowStorageObj = _isPermanent
    ? window.localStorage
    : window.sessionStorage
  /**
   * [本地存储对象(localStorage|sessionStorage)]
   * @type {objecy}
   */
  var storageObj = _isPermanent ? localStorage : sessionStorage
  // if (pbDebug) console.log('delLocalData', storageKey);
  try {
    if (storageKey in windowStorageObj) {
      windowStorageObj.removeItem(storageKey)
      if (typeof cb === 'function') {
        cb()
      }
    } else if (storageKey in storageObj) {
      storageObj.removeItem(storageKey)
      if (typeof cb === 'function') {
        cb()
      }
    } else {
      storageObj.removeItem(storageKey)
      if (typeof cb === 'function') {
        cb()
      }
    }
  } catch (errStorageObj) {
    // if (isLoging) throw new Error('Storage数据失败! [' + errStorageObj.toString() + ']');
    // return false;
  }
}
// 批量删除
export const delBatchLocalData = function(dataArray, cb, isPermanent) {
  for (var i = 0, _length = dataArray.length; i < _length; i++) {
    delLocalData(dataArray[i], cb, isPermanent)
  }
}
/**
 * @function clearLocalData
 * @memberOf pbFunc
 * @ngdoc function
 * @description 清除所有本地存储数据
 * @param {boolean} isPermanent [是否是local storage，如果不是就是session storage]
 */
export const clearLocalData = function(isPermanent) {
  /**
   * [是否永久保存]
   * @type {boolean}
   */
  var _isPermanent = typeof isPermanent === 'boolean' ? isPermanent : false
  /**
   * [本地存储对象]
   * @type {objecy}
   */
  var windowStorageObj = _isPermanent
    ? window.localStorage
    : window.sessionStorage
  try {
    windowStorageObj.clear()
    return true
  } catch (errStorageObj) {
    throw new Error('Storage清除数据失败! [' + errStorageObj.toString() + ']')
    // eslint-disable-next-line
    return false
  }
}

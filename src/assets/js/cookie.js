/* 浏览器相关 */
/**
 * @function isMobile
 * @memberOf pbFunc
 * @ngdoc function
 * @description 是否是移动终端
 * @returns {boolean} [是否是移动终端]
 */
export const isMobile = function() {
  return !!navigator.userAgent.toString().match(/mobile/i)
}

/**
 * @function setCookie
 * @memberOf pbFunc
 * @ngdoc function
 * @description 设置cookie
 * @param {string} key   [cookie名称]
 * @param {string} value [cookie值]
 * @param {number} day   [有效天数]
 */
export const setCookie = function(key, value, day) {
  /**
   * cookie保存秒数
   * @type {number}
   */
  var ckTime =
    day !== undefined && typeof day === 'number'
      ? parseInt(day) * 86400000
      : 86400000
  /**
   * 过期时间对象
   * @type {object}
   */
  var expires = new Date()
  /**
   * 更多设置内容
   * @type {string}
   */
  var more = ''
  if (document.location.href.toString().match(/^https:/i)) more += 'secure;'
  expires.setTime(expires.getTime() + ckTime)
  // secure   : 表示cookie只能被发送到http服务器。
  // httponly : 表示cookie不能被客户端脚本获取到。(后弹才能用)
  document.cookie =
    key + '=' + value + ';expires=' + expires.toUTCString() + ';path=/;' + more
}
/**
 * @function delCookie
 * @memberOf pbFunc
 * @ngdoc function
 * @description 删除cookie
 * @param {string} key   [cookie名称]
 */
export const delCookie = function(key) {
  /**
   * 过期时间对象
   * @type {object}
   */
  var expires = new Date()
  expires.setTime(expires.getTime() - 86400)
  document.cookie = key + '=;expires=' + expires.toUTCString() + ';path=/;'
}
/**
 * @function getCookie
 * @memberOf pbFunc
 * @ngdoc function
 * @description 获取cookie
 * @param {string} key   [cookie名称]
 * @returns {string} [返回cookie值]
 */
export const getCookie = function(key) {
  /**
   * cookie值
   * @type {object}
   */
  var keyValue = document.cookie.match('(^|;) ?' + key + '=([^; ]*)(;|$)')
  return keyValue ? keyValue[2] : null
}

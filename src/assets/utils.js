/*
 * 常用函数库
 */

import * as COOKIE from './js/cookie'
import * as CACHE from './js/cache'
import * as ARROBJ from './js/arrobj'
import * as STR from './js/str'
import * as DATE from './js/date'

/* 浏览器相关 */
export const isMobile = COOKIE.isMobile
export const setCookie = COOKIE.setCookie
export const delCookie = COOKIE.delCookie
export const getCookie = COOKIE.getCookie

/* 缓存相关 */
export const setLocalData = CACHE.setLocalData
export const getLocalData = CACHE.getLocalData
export const delLocalData = CACHE.delLocalData
export const delBatchLocalData = CACHE.delBatchLocalData
export const clearLocalData = CACHE.clearLocalData
// export const cacheKey = CACHE.cacheKey
// export const setLocalDataWithTime = CACHE.setLocalDataWithTime
// export const getLocalDataWithTime = CACHE.getLocalDataWithTime

/* 数组对象相关 */
export const isArray = ARROBJ.isArray
export const inArray = ARROBJ.inArray
export const inObjName = ARROBJ.inObjName
export const objToArrStr = ARROBJ.objToArrStr
export const objByKeyToArr = ARROBJ.objByKeyToArr
export const arrToObj = ARROBJ.arrToObj
export const arrToObjWithKey = ARROBJ.arrToObjWithKey
export const objPushToArr = ARROBJ.objPushToArr
export const isEmptyObj = ARROBJ.isEmptyObj
export const objSize = ARROBJ.objSize
// export const objPrint = ARROBJ.objPrint
export const chkObjLen = ARROBJ.chkObjLen
export const getObjFromArrByKey = ARROBJ.getObjFromArrByKey
export const delObjKey = ARROBJ.delObjKey
// export const arrFilter = ARROBJ.arrFilter
export const objValues = ARROBJ.objValues
export const objKeys = ARROBJ.objKeys
export const deepcopy = ARROBJ.deepcopy
export const fifterObjIsNull = ARROBJ.fifterObjIsNull
export const fifterbyArr = ARROBJ.fifterbyArr
export const dealNullData = ARROBJ.dealNullData
export const format = ARROBJ.format
export const compareDate = ARROBJ.compareDate

/* 字符串相关 */
export const paddingZero = STR.paddingZero
export const trimStr = STR.trimStr
export const cutKeyword = STR.cutKeyword
export const cleanKeywords = STR.cleanKeywords
export const stripHtmlTag = STR.stripHtmlTag
export const cnStrlen = STR.cnStrlen
export const hasChinese = STR.hasChinese
export const cutChinese = STR.cutChinese
export const shrinkFileNameCn = STR.shrinkFileNameCn
export const cleanHtmlForFn = STR.cleanHtmlForFn
export const htmlToSms = STR.htmlToSms
export const cnNum = STR.cnNum
export const toPinyin = STR.toPinyin
export const toPinyinObjArr = STR.toPinyinObjArr

/* 日期相关 */
export const getDateDetail = DATE.getDateDetail

export default {

}

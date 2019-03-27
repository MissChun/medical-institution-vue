/* axios二次封装
 * desc:
 * 统一捕获接口报错
 * 统一报错弹窗提示
 * 接入api
 */

import axios from 'axios'
import { Message } from 'element-ui'
import api from './api'
import { getLocalData } from '../assets/js/cache'
import router from '../router'

/* 接口超时时长设置 */
let timeout = 60000

/* 配置访问url */
let domainUrl = ''
export const getDomainUrl = function(prefix = '') {
  // 掐指一算五个环境
  let currentUrl = document.location.href.toString()
  let domainUrl = ''

  if (currentUrl.match('ptms.hhtdlng.com')) {
    // 演示环境
    domainUrl = `${prefix}ptms.hhtdlng.com`
  } else if (currentUrl.match('ptms.91lng.cn')) {
    // 预发环境
    domainUrl = `${prefix}ptms.91lng.cn`
  } else if (currentUrl.match(`tc.shengdujk.com`)) {
    // 测试环境
    domainUrl = `${prefix}api.shengdujk.com`
  } else if (
    currentUrl.match(`tms.91lng.cn`) &&
    !currentUrl.match(`ptms.91lng.cn`) &&
    !currentUrl.match(`testtms.91lng.cn`)
  ) {
    // 正式环境
    domainUrl = `${prefix}api.91lng.com/tms`
  } else if (currentUrl.match(`devtms.hhtdlng.com`)) {
    // 开发环境
    domainUrl = `${prefix}devtms.hhtdlng.com`
  } else if (currentUrl.match(`testtms.91lng.cn`)) {
    // 开发环境
    domainUrl = `${prefix}testtms.91lng.cn`
  } else if (currentUrl.match(`vtms.hhtdlng.com`)) {
    // 开发环境
    domainUrl = `${prefix}api.hhtdlng.com/tms`
  } else {
    domainUrl = `${prefix}dapi.shengdujk.com` // 本地开发环境
  }
  return domainUrl
}

domainUrl = getDomainUrl('http://')

let pending = [] // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let unCancelAjax = [] // 设定可以重复请求的ajax请求的apiname(str)。
let cancelToken = axios.CancelToken
// let cancelLimitTime = 500 // 设置需要cancel的间隔时限

// 切换路由时，cancel请求
router.beforeEach((to, from, next) => {
  if (pending.length) {
    for (let i in pending) {
      pending[i].cancel()
    }
  }
  next()
})

let removePending = (config, isCancel) => {}

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    removePending(config, true) // 在一个ajax发送前执行一下取消操作
    let isNeedCancel = true
    if (unCancelAjax.length) {
      for (let i in unCancelAjax) {
        if (
          api[unCancelAjax[i]].url.split('?')[0] === config.url.split('?')[0]
        ) {
          isNeedCancel = false
          break
        }
      }
    }
    if (isNeedCancel) {
      // eslint-disable-next-line
      config.cancelToken = new cancelToken(c => {
        // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
        pending.push({
          u: config.url + '&' + config.method,
          cancel: c,
          time: new Date()
        })
      })
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    removePending(response.config) // 在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
    return response
  },
  error => {
    return Promise.reject(error) // 返回一个空对象，主要是防止控制台报错
  }
)

/* 统一处理网络问题或者代码问题造成的错误 */
const errorState = function(error) {
  let errorMsg = ''
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        errorMsg = '参数错误'
        break
      case 401:
        errorMsg = '未授权或登录过期，请重新登录'
        break
      case 403:
        errorMsg = '拒绝访问'
        break
      case 404:
        errorMsg = '请求出错(404)'
        break
      case 405:
        errorMsg = '拒绝访问(405)'
        break
      case 408:
        errorMsg = '请求超时，请检查网络'
        break
      case 500:
        errorMsg = '服务器错误(500)'
        break
      case 501:
        errorMsg = '服务未实现(501)'
        break
      case 502:
        errorMsg = '网络错误(502)'
        break
      case 503:
        errorMsg = '服务不可用(503)'
        break
      case 504:
        errorMsg = '网络超时(504)'
        break
      case 505:
        errorMsg = 'HTTP版本不受支持(505)'
        break
      default:
        errorMsg = `连接出错(${error.response.status})!`
    }
  } else if (error.code === 'ECONNABORTED') {
    errorMsg = '接口超时，请检查网络再刷新重试!'
  } else {
    errorMsg = '连接服务器失败!'
  }
  if (!axios.isCancel(error)) {
    // 如果是主动取消，则不报错误信息，（在切换路由的时候会主动取消请求）
    Message.error(errorMsg)
  }
  if (error && error.response && error.response.status === 401) {
    router.push({
      path: '/login'
    })
  }
}

/* 根据后端接口文档统一处理错误信息 */
const successState = function(response) {
  if (response.data && response.data.code) {
    if (response.data.code === 401) {
      Message.error('登录过期，请重新登录')
      router.push({
        path: '/login'
      })
    } else if (response.data.code === 403) {
      Message.error('无操作权限')
    } else if (response.data.code === 0) {
    } else {
      if (response.data.msg) {
        Message.error(response.data.msg)
      }
    }
  }
}

/* 处理url */
const dealApiUrlParam = function(apiName, postData) {
  let httpUrl = api[apiName].url

  if (httpUrl) {
    // 设置最大循环数,以免死机
    let maxTimes = 0
    while (httpUrl.match(/:([0-9a-z_]+)/i)) {
      let tempV = RegExp.$1
      maxTimes++
      // httpUrl最大支持10个变量替换
      if (maxTimes > 10) break
      let reg = new RegExp(':' + tempV, 'ig')
      if (postData.hasOwnProperty(tempV)) {
        httpUrl = httpUrl.replace(reg, postData[tempV])
        delete postData[tempV]
      }
    }
  }
  return httpUrl
}

/* 处理http请求config */
const dealConfig = function(apiName, postData) {
  const httpConfig = {
    method: '',
    baseURL: domainUrl,
    url: '',
    timeout: timeout,
    params: '',
    data: postData,
    headers: ''
  }

  if (!api.hasOwnProperty(apiName)) return

  let apiUrl = api[apiName].url ? api[apiName].url : ''
  let method = api[apiName].method ? api[apiName].method.toLowerCase() : ''
  let token = getLocalData('token', true)
  httpConfig.method = method

  /* eslint-disable */
  httpConfig.headers =
    method === 'get'
      ? {
          'X-Requested-With': 'XMLHttpRequest',
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=UTF-8'
        }
      : {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json; charset=UTF-8'
        }
  /* eslint-enable */
  if (!api[apiName].notNeedToken) {
    httpConfig.headers.Authorization = token
  }

  if (apiUrl) {
    apiUrl = dealApiUrlParam(apiName, postData)
  } else {
    return false
  }

  if (method === 'get' || method === 'delete') {
    delete httpConfig.data
  }

  if (method) {
    if (
      (method === 'get' || method === 'delete') &&
      (postData && typeof postData === 'object')
    ) {
      // 如果接口为 get 请求，但是参数需要用？跟随，这是需要的对应处理
      let params = '?'
      let existedVars = {}
      for (let t in postData) {
        if (!existedVars.hasOwnProperty(t)) {
          params += t + '=' + encodeURIComponent(postData[t]) + '&'
        }
      }
      if (params.match(/^(.+)&$/i)) {
        params = RegExp.$1
        apiUrl += params
      }
    }
    httpConfig.url = apiUrl
    return httpConfig
  } else {
    return false
  }
}

/* http请求统一函数 */
export const httpServer = (
  apiName,
  postData,
  defaultSuccessCallback,
  defaultErrorCallback
) => {
  if (!apiName) return false

  let httpConfig = dealConfig(apiName, postData)

  let promise = new Promise(function(resolve, reject) {
    axios(httpConfig)
      .then(res => {
        // 默认使用successState
        if (defaultSuccessCallback === undefined) {
          successState(res)
        } else if (typeof defaultSuccessCallback === 'function') {
          defaultSuccessCallback(res)
        }
        resolve(res)
      })
      .catch(response => {
        // 默认使用errorState
        if (defaultErrorCallback === undefined) {
          errorState(response)
        } else if (typeof defaultErrorCallback === 'function') {
          defaultErrorCallback(response)
        }
        reject(response)
      })
  })
  return promise
}

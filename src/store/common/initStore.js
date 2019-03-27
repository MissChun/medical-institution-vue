/**
 * Created by wansan on 2017/10/10.
 */
export default {
  inintString: '',
  inintObject: {},
  inintArrary: [],
  inint: false,
  inintNum: 5,
  show: false,
  showAmessage: 'stor测试测试',
  initAddnum: 1,
  menuData: '',
  userData: '',
  isRoleManger: true,
  isRole: '',
  defaultShow: {
    addButton: true,
    removeButton: true,
    queryButton: false
  },
  unreadNewNum: 0, // 未读消息
  selectData: {}, // 全局数据
  users: {}, // 用户个人信息
  menuList: [],
  wsMsg: null, // websocket
  regular: {
    frequency: {
      match: /[^\d.]/,
      tips: '请输入数值正数1~999数值'
    },
    price: {
      match: /^(\+)?\d+(\.\d{1,2})?$/,
      tips: '请输入数值正数且最多两位小数的数值'
    },
    accounts: {
      // eslint-disable-next-line
      match: /^(\-|\+)?\d+(\.\d{1,2})?$/,
      tips: '请输入数值且最多两位小数的数值'
    },
    tonnage: {
      // eslint-disable-next-line
      match: /^(\-|\+)?\d+(\.\d{1,3})?$/,
      tips: '请输入数值且最多三位小数的数值'
    },
    variableRate: {
      match: /^(\+)?\d+(\.\d{1,3})?$/,
      tips: '请输入数值正数且最多三位小数的数值'
    },
    variableValue: {
      match: /^(\+)?\d+(\.\d{1,5})?$/,
      tips: '请输入数值正数且最多五位小数的数值'
    },
    mile: {
      // eslint-disable-next-line
      match: /^(\-|\+)?\d+(\.\d{1,1})?$/,
      tips: '请输入数值且最多一位小数的数值'
    },
    name: {
      match: /^[\u4e00-\u9fa5]{2,10}$/,
      tips: '请输入2~10个汉字'
    },
    idNumber: { // 身份证号码
      // match:regularReg.idCardVa,
      match: /^([1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2})$/,
      tips: '请输入正确的身份证号码'
    },
    phone: { // 手机号码
      match: /^1\d{10}$/,
      tips: '请输入正确的手机号码'
    },
    plateNumber: { // 车牌号
      match: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
      tips: '车牌号格式为：一个汉字+6个字段，如：鲁GP8996'
    },
    trailerNumber: { // 挂车号
      match: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领]{1}[A-Z]{1}[A-Z0-9]{4}[挂]{1}$/,
      tips: '车牌号为:一个汉字+5个字段+挂 如：鲁GP899挂'
    },
    email: { // 邮箱
      match: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      tips: '邮箱格式不正确，请重新输入'
    },
    username: { // 用户名
      match: /([\u4E00-\u9FA5A-Za-z0-9]{4,20})$/gi,
      tips: '用户名为4-20个字符，支持中文、字母、数字'
    },
    password: { // 密码
      match: /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/,
      tips: '密码长度6-16位，支持数字、字母、字符（除空格）,至少包含2种'
    },
    creditCode: { // 信用代码
      match: /^([A-Z0-9]{18})$/,
      tips: '由18位数字和大写字母组成'
    },
    contactPhone: { // 联系方式
      match: /(^(\(0\d{2,3}\)|0\d{2,3}-|\s)?\d{7,8}$)|(^1\d{10}$)/,
      tips: '请输入座机号或者手机号'
    }
  }
}

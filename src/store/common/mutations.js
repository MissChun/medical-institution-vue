/* 同步操作,部分业务逻辑代码写这里 */
export default {
  ChangeinitParam(state, newValues) {
    state.showAmessage = newValues
  },
  ChangeMsgNum(state, type) {
    state.unreadNewNum = state.unreadNewNum + type.num
  }
}

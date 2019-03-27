let dealNullData = data => {
  // eslint-disable-next-line
  if (data == null || data == undefined || data == '') {
    return '无'
  } else {
    return data
  }
}
let dateFilter = value => {
  let dates = []
  if (value) {
    dates = value.split(' ')
  }
  return dates.length ? dates[0] : value
}
let hourFilter = value => {
  let dates = []
  if (value) {
    dates = value.split(':')
  }
  return dates.length ? dates[0] : value
}
export { dealNullData, dateFilter, hourFilter }

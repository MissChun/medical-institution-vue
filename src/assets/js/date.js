export const getDateDetail = function(date) {
  if (date && date.getFullYear()) {
    let dateDetail = {}
    dateDetail.year = date.getFullYear()
    dateDetail.month =
      date.getMonth() + 1 > 9
        ? date.getMonth() + 1
        : '0' + (date.getMonth() + 1)
    dateDetail.day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
    dateDetail.hour =
      date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
    dateDetail.minute =
      date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
    dateDetail.second =
      date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()

    return dateDetail
  } else {
    return date
  }
}

export function DateFormat(timeString) {
  //时间格式化  yyyy-MM-dd HH:mm
  let date = new Date(timeString)
  let year = date.getFullYear()
  let month = date.getMonth()+1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  return `${year}-${month}-${day} ${hour}:${minute}`
}

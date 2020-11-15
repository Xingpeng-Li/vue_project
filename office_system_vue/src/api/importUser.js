import request from '../util/request'

export function importToDB(file) {
  return request({
    url: "/dept/import",
    method: "post",
    data:{
      'file': file
    }
  })
}

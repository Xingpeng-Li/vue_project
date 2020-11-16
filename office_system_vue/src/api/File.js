import request from '../util/request'

export function uploadImage(file,type) {
  var burl = "/upload/"
  return request({
    url: burl+type,
    method: "post",
    data:{
      'file': file,
    }
  })
}

import request from '../util/request'

export function joinVideo() {
  return request({
    url: '/joinVideo',
    method: "get",
    param:{
    }
  })
}

export function join(guid) {
  var burl = "/join/"
  return request({
    url: burl+guid,
    method: "post",
    data:{
    }
  })
}


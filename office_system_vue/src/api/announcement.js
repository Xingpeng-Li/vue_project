
import request from "../util/request"

export function sendAnnouncement(type,title,body) {
  return request({
    url: "/announcement/send",
    method: "post",
    data: {
      'type': type,
      'title': title,
      'body': body
    }
  })
}

export function getAnnouncement(type) {
  return request({
    url: "/announcement/get",
    method: "get",
    params: {
      'type': type
    }
  })
}



import request from '../util/request'

export function getAllNotification() {
  return request({
    url: "/notification/get",
    method: "get",
  })
}

export function deleteNotification(notificationId) {
  return request({
    url: "/notification/delete",
    method: "get",
    params: {
      'notificationId': notificationId
    }
  })
}

export function readNotification(notificationId) {
  return request({
    url: "/notification/read",
    method: "get",
    params: {
      'notificationId': notificationId
    }
  })
}

import request from '../util/request'

export function getAllNotification() {
  return request({
    url: "/notification/get",
    method: "get",
  })
}

export function deleteNotification(notificationId) {
  let formData = new FormData()
  formData.append('notificationId',notificationId)
  return request({
    url: "/notification/delete",
    method: "post",
    data: formData
  })
}

export function readNotification(notificationId) {
  let formData = new FormData()
  formData.append('notificationId',notificationId)
  return request({
    url: "/notification/read",
    method: "post",
    data: formData
  })
}

import request from '../util/request'

export function addUser(groupUniqueId, state) {
  let formData = new FormData()
  formData.append('groupUniqueId',groupUniqueId)
  formData.append('state',state)
  return request({
    url: "/ov/init",
    method: "post",
    data: formData
  })
}

export function removeUser() {
  return request({
    url: "/ov/leave",
    method: "post"
  })
}

export function record(groupUniqueId, state) {
  let formData = new FormData()
  formData.append('groupUniqueId',groupUniqueId)
  formData.append('state',state)
  return request({
    url: "/ov/record",
    method: "post",
    data: formData
  })
}

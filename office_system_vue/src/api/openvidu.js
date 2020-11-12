import request from '../util/request'

export function addUser(groupUniqueId, state) {
  return request({
    url: "/ov/init",
    method: "post",
    data: {
      'groupUniqueId': groupUniqueId,
      'state': state
    }
  })
}

export function removeUser() {
  return request({
    url: "/ov/leave",
    method: "post"
  })
}

export function record(groupUniqueId, state) {
  return request({
    url: "/ov/record",
    method: "post",
    data: {
      'groupUniqueId': groupUniqueId,
      'state': state
    }
  })
}

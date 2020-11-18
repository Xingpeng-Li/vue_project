import request from "../util/request";

export function punchin(key) {
  return request({
    url: "/user/punchin",
    method: "get"
  })
}

export function sendPunchinNotification(key) {
  return request({
    url: "/punchin/notification",
    method: "get"
  })
}

export function getPunchinCount() {
  return request({
    url: "/punchin/count",
    method: "get"
  })
}

export function healthExcel(key) {
  return request({
    url: "/punchin",
    method: "get"
  })
}


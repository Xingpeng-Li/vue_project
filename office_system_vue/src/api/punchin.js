import request from "../util/request";

export function punchin() {
  return request({
    url: "/user/punchin",
    method: "get"
  })
}

export function sendPunchinNotification() {
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

export function healthExcel() {
  return request({
    url: "/punchin",
    method: "get"
  })
}


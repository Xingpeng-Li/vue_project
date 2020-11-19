import request from "../util/request"

export function uploadFile(file) {
  return request({
    url: "/uploadFile",
    method: "post",
    data: {
      'file': file
    }
  })
}

export function copyfile(fileId) {
  return request({
    url: "/copyfile",
    method: "post",
    data: {
      'fileId': fileId
    }
  })
}

export function getMyFiles() {
  return request({
    url: "/getMyFiles",
    method: "get",
  })
}

export function deleteFile(fileId) {
  return request({
    url: "/deleteFile",
    method: "get",
    params: {
      'fileId': fileId
    }
  })
}

export function getAll() {
  return request({
    url: "/getAll",
    method: "get",
  })
}

export function search(key) {
  return request({
    url: "/search",
    method: "get",
    params: {
      'key': key
    }
  })
}


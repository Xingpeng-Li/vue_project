import request from "../util/request"

export function uploadFile(file) {
  let formData = new FormData()
  formData.append('file',file)
  return request({
    url: "/cloudFile/uploadFile",
    method: "post",
    data: formData
  })
}

export function copyfile(fileId) {
  return request({
    url: "/cloudFile/copyfile",
    method: "post",
    data: {
      'fileId': fileId
    }
  })
}

export function getMyFiles() {
  return request({
    url: "/cloudFile/getMyFiles",
    method: "get",
  })
}

export function deleteFile(fileId) {
  return request({
    url: "/cloudFile/deleteFile",
    method: "get",
    params: {
      'fileId': fileId
    }
  })
}

export function getAll() {
  return request({
    url: "/cloudFile/getAll",
    method: "get",
  })
}

export function search(key) {
  return request({
    url: "/cloudFile/search",
    method: "get",
    params: {
      'key': key
    }
  })
}


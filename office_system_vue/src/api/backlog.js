import request from "../util/request"

export function createBacklog(title, description, endTime) {
  let formData = new FormData()
  formData.append('title',title)
  formData.append('description',description)
  formData.append('endTime',endTime)
  return request({
    url: "/backlog/create",
    method: "post",
    data: formData
  })
}

export function getNotFinishedBackLogs() {
  return request({
    url: "/backlog/getNotFinished",
    method: "get",
  })
}

export function getFinishedBackLogs() {
  return request({
    url: "/backlog/getFinished",
    method: "get",
  })
}

export function updateBacklog(title,description,endTime) {
  let formData = new FormData()
  formData.append('title',title)
  formData.append('description',description)
  formData.append('endTime',endTime)
  return request({
    url: "/backlog/update",
    method: "post",
    data: formData
  })
}

export function deleteBacklog(backlogId) {
  let formData = new FormData()
  formData.append('backLogId',backlogId)
  return request({
    url: "/backlog/delete",
    method: "post",
    data: formData
  })
}

export function finishBacklog(backlogId) {
  let formData = new FormData()
  formData.append('backLogId',backlogId)
  return request({
    url: "/backlog/finish",
    method: "post",
    data: formData
  })
}

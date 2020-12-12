import request from "../util/request"

export function sendApplication(type,startTime,endTime,reason,approverId,secondApproverId) {
  let formData = new FormData()
  formData.append('type',type)
  formData.append('startTime',startTime)
  formData.append('endTime',endTime)
  formData.append('reason',reason)
  formData.append('approverId',approverId)
  formData.append('secondApproverId',secondApproverId)
  return request({
    url: "/application/send",
    method: "post",
    data: formData
  })
}

export function getApplication(notificationId) {
  return request({
    url: "/application/get",
    method: "get",
    params: {
      'notificationId': notificationId
    }
  })
}

export function disposeApplication(notificationId,isAgree) {
  return request({
    url: "/application/dispose",
    method: "get",
    params: {
      'notificationId': notificationId,
      'isAgree': isAgree,
    }
  })
}

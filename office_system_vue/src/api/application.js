import request from "../util/request"

export function sendApplication(type,startTime,endTime,reason,approverPhoneNumber,secondApproverPhoneNumber) {
  return request({
    url: "/application/send",
    method: "post",
    data: {
      'type': type,
      'startTime': startTime,
      'endTime': endTime,
      'reason': reason,
      'approverPhoneNumber': approverPhoneNumber,
      'secondApproverPhoneNumber':secondApproverPhoneNumber
    }
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

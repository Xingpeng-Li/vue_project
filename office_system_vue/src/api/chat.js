import request from "../util/request"


export function joinChat() {
  return request({
    url: "/chat/join",
    method: "get"
  })
}

export function getSocketMessageByDate(date,launchId,receiveId,companyId,deptId) {
  return request({
    url: "/chatRoom/group/message",
    method: "post",
    data: {
      'date': date,
      'launchId': launchId,
      'receiveId': receiveId,
      'companyId': companyId,
      'deptId': deptId
    }
  })
}

export function getSocketUserRelevant(userId) {
  return request({
    url: "/chatRoom/users/relevant",
    method: "get",
    params:{
      "userId":userId
    }
  })
}

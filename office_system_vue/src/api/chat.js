import request from "../util/request"


export function joinChat() {
  return request({
    url: "/chat/join",
    method: "get"
  })
}

export function getSocketMessageByDate(date,launchId,receiveId,companyId,deptId) {
  let formData = new FormData();
  formData.append('date',date);
  formData.append('launchId',launchId);
  formData.append('receiveId',receiveId);
  formData.append('companyId',companyId);
  formData.append('deptId',deptId);
  return request({
    url: "/chatRoom/group/message",
    method: "post",
    data: formData,
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

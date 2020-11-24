import request from '../util/request'

export function healthExcel() {
  return request({
    url: "/health/punchin",
    method: "get",
    param:{
    }
  })
}

export function health(usertemperature,usercity,userprovince,HealthStatus,ContactSuspectedCase,PunchinNote) {
  let formData = new FormData();
  formData.append('usertemperature',usertemperature);
  formData.append('usercity',usercity);
  formData.append('userprovince',userprovince);
  formData.append('HealthStatus',HealthStatus);
  formData.append('ContactSuspectedCase',ContactSuspectedCase);
  formData.append('PunchinNote',PunchinNote);
  return request({
    url: "/user/health",
    method: "post",
    data:formData
  })
}

export function getDeptUser() {
  return request({
    url: "health/count",
    method: "get",
    param:{
    }
  })
}

export function sendHealthPunchinNotification() {
  return request({
    url: "health/notification",
    method: "get",
    param:{
    }
  })
}


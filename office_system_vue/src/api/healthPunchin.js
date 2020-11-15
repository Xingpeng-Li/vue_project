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
  return request({
    url: "/user/health",
    method: "post",
    data:{
      'usertemperature': usertemperature,
      'usercity': usercity,
      'userprovince': userprovince,
      'HealthStatus': HealthStatus,
      'ContactSuspectedCase': ContactSuspectedCase,
      'PunchinNote': PunchinNote
    }
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


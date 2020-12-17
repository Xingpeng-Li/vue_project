import request from '../util/request'

export function login(phoneNumber,verificationCode) {

  return request({
    url: "/loginByPhone",
    method: "post",
    params:{
      'phoneNumber': phoneNumber,
      'verificationCode': verificationCode
    }
  })
}

export function loginByPassword(phoneNumber,password) {
  return request({
    url: "login",
    method: "post",
    params: {
      'phoneNumber': phoneNumber,
      'password': password
    }
  })
}

export function logout() {
  return request({
    url: "/logout",
    method: "get",
    params: {
    }
  })
}

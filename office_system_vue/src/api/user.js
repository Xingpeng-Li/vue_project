import request from '../util/request'

export function getDeptContact() {
  //查询接口
  return request({
    url: "/getDeptContacts",
    method: "get"
  })
}

export function getCompanyContact() {
  //查询接口
  return request({
    url: "/getCompanyContacts",
    method: "get"
  })
}


export function getNoDeptContacts() {
  //查询接口
  return request({
    url: "/getNoDeptContacts",
    method: "get"
  })
}


export function updatePersonInfo(phoneNumber,password,userName,verificationCode) {
  //查询接口
  let formData = new FormData();
  formData.append('phoneNumber',phoneNumber);
  formData.append('password',password);
  formData.append('userName',userName);
  formData.append('verificationCode',verificationCode);
  return request({
    url: "/updatePersonalInfo",
    method: "post",
    data: formData
  })
}


export function getMyPersonalInfo() {
  //查询接口
  return request({
    url: "/getMyPersonalInfo",
    method: "get"
  })
}


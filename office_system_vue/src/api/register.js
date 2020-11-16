import request from '../util/request'

export function verificationCode(phoneNumber,type) {
  let formData = new FormData();
  formData.append('phoneNumber',phoneNumber);
  formData.append('type',type);
  return request({
    url: "/verificationCode",
    method: "post",
    data: formData
  })
}

export function register(userName,password,phoneNumber,verificationCode) {
  let formData = new FormData();
  formData.append('userName',userName);
  formData.append('password',password);
  formData.append('phoneNumber',phoneNumber);
  formData.append('verificationCode',verificationCode);
  return request({
    url: "/register",
    method: "post",
    data:formData
  })
}


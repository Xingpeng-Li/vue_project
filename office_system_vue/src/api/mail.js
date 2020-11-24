import request from '../util/request'

export function sendAttachmentsMail(file,to,subject,content) {
  let formData = new FormData();
  formData.append('file',file);
  formData.append('to',to);
  formData.append('subject',subject);
  formData.append('content',content);
  return request({
    url: "/sendAttachmentsMail",
    method: "post",
    data:formData
  })
}

export function receive() {
  return request({
    url: "/mail/receive",
    method: "get",
    param:{
    }
  })
}
export function mailLogin(userMail,mailPassword) {
  let formData = new FormData();
  formData.append('userMail',userMail);
  formData.append('mailPassword',mailPassword);
  return request({
    url: "/mail/login",
    method: "post",
    data:formData
  })
}
export function getAllMailContent() {
  return request({
    url: "/mail/all",
    method: "get",
    param:{
    }
  })
}
export function mailContent(id) {
  let formData = new FormData();
  formData.append('id',id);
  return request({
    url: "/mail/content",
    method: "post",
    data:formData
  })
}
export function mailAlready() {
  return request({
    url: "/mail/already",
    method: "get",
    param:{
    }
  })
}

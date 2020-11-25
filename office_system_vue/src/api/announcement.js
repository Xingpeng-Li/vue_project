
import request from "../util/request"

export function sendAnnouncement(file,type,title,body) {
  let formData = new FormData();
  formData.append('type',type);
  formData.append('title',title);
  formData.append('body',body);
  formData.append('file',file);
  return request({
    url: "/announcement/send",
    method: "post",
    data: formData
  })
}

export function getAnnouncement(type) {
  return request({
    url: "/announcement/get",
    method: "get",
    params: {
      'type': type
    }
  })
}



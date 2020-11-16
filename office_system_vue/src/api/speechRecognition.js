import request from '../util/request'

export function requestRecognition(file) {
  let formData = new FormData();
  formData.append("file",file);
  return request({
    url: "/announcement/send",
    method: "post",
    data: formData
  })
}


export function getRecognitionResult() {
  return request({
    url: "/getRecognitionResult",
    method: "get"
  })
}

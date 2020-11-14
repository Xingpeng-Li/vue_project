import request from '../util/request'

export function select(keywords) {
  let formData = new FormData();
  formData.append('keywords',keywords)
  //查询接口
  return request({
    url: "/announcement/send",
    method: "post",
    data: formData
  })
}

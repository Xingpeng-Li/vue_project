import request from '../util/request'

export function select(keywords) {
  //查询接口
  return request({
    url: "/announcement/send",
    method: "post",
    data: {
      'keywords':keywords
    }
  })
}

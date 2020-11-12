import request from '../util/request'

export function postDetail(postId) {
  return request({
    url: "/post/get",
    method: "post",
    data: {
      'postId': postId
    }
  })
}

export function createPost(file,postTitle,postBody,postBrief) {
  return request({
    url: "/post/createPost",
    method: "post",
    data: {
      'file': file,
      'postTitle': postTitle,
      'postBody': postBody,
      'postBrief': postBrief
    }
  })
}

export function readNotification(notificationId) {
  return request({
    url: "/notification/read",
    method: "get",
    params: {
      'notificationId': notificationId
    }
  })
}

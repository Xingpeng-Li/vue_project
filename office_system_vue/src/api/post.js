import request from '../util/request'

export function postDetail(postId) {
  let formData = new FormData()
  formData.append('postId',postId)
  return request({
    url: "/post/get",
    method: "post",
    data: formData
  })
}

export function createPost(file,postTitle,postBody,postBrief,publicAccountId) {
  let formData = new FormData()
  formData.append('file',file)
  formData.append('postTitle',postTitle)
  formData.append('postBody',postBody)
  formData.append('postBrief',postBrief)
  formData.append('publicAccountId',publicAccountId)
  return request({
    url: "/post/createPost",
    method: "post",
    data: formData
  })
}

export function readNotification(notificationId) {
  let formData = new FormData()
  formData.append('notificationId',notificationId)
  return request({
    url: "/notification/read",
    method: "post",
    data: formData
  })
}

import request from '../util/request'

export function createPersonalAccount(name,brief) {
  let formData = new FormData()
  formData.append('name',name)
  formData.append('brief',brief)
  return request({
    url: "/publicAccount/createPersonalAccount",
    method: "post",
    data: formData
  })
}

export function createCompanyAccount(name,brief) {
  let formData = new FormData()
  formData.append('name',name)
  formData.append('brief',brief)
  return request({
    url: "/publicAccount/createCompanyAccount",
    method: "post",
    data: formData
  })
}

export function createPost(id) {
  let formData = new FormData()
  formData.append('id',id)
  return request({
    url: "/publicAccount/createPost",
    method: "post",
    data: formData
  })
}

export function myPublicAccounts() {
  return request({
    url: "/publicAccount/personalPublicAccounts",
    method: "get"
  })
}

export function companyPublicAccounts() {
  return request({
    url: "/publicAccount/companyPublicAccounts",
    method: "get"
  })
}

export function allSubscribePublicAccounts() {
  return request({
    url: "/publicAccount/allSubscribePublicAccounts",
    method: "get"
  })
}

export function search(key) {
  let formData = new FormData()
  formData.append('key',key)
  return request({
    url: "/publicAccount/search",
    method: "post",
    data: formData
  })
}

export function getAllPosts(id) {
  let formData = new FormData()
  formData.append('id',id)
  return request({
    url: "/publicAccount/getAllPosts",
    method: "post",
    data: formData
  })
}

export function subscribe(id) {
  let formData = new FormData()
  formData.append('id',id)
  return request({
    url: "/publicAccount/subscribe",
    method: "post",
    data: formData
  })
}

export function unsubscribe(id) {
  let formData = new FormData()
  formData.append('id',id)
  return request({
    url: "/publicAccount/unsubscribe",
    method: "post",
    data: formData
  })
}

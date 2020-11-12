import request from '../util/request'

export function createPersonalAccount(name,brief) {
  return request({
    url: "/publicAccount/createPersonalAccount",
    method: "post",
    data: {
      'name': name,
      'brief': brief
    }
  })
}

export function createCompanyAccount(name,brief) {
  return request({
    url: "/publicAccount/createCompanyAccount",
    method: "get",
    params: {
      'name': name,
      'brief': brief
    }
  })
}

export function createPost(id) {
  return request({
    url: "/publicAccount/createPost",
    method: "post",
    data: {
      'id': id
    }
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
  return request({
    url: "/publicAccount/search",
    method: "post",
    data: {
      'key': key
    }
  })
}

export function getAllPosts(id) {
  return request({
    url: "/publicAccount/getAllPosts",
    method: "post",
    data: {
      'id': id
    }
  })
}

export function subscribe(id) {
  return request({
    url: "/publicAccount/subscribe",
    method: "post",
    data: {
      'id': id
    }
  })
}

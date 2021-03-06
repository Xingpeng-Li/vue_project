import request from "../util/request"


export function haveAuthority() {
  return request({
    url: "/company/authority",
    method: "get"
  })
}

export function addCompany(companyName) {
  let formData = new FormData()
  formData.append("companyName", companyName)
  return request({
    url: "/company/add",
    method: "post",
    data: formData
  })
}

export function joinCompany(companyCode) {
  let formData = new FormData()
  formData.append("companyCode", companyCode)
  return request({
    url: "/company/join",
    method: "post",
    data: formData
  })
}

////
export function addDeptToDB(deptname,masterPhoneNumber,userIds) {
  return request({
    url: "/company/addDeptToDB",
    method: "post",
    data: {
      'deptname': deptname,
      'masterPhoneNumber': masterPhoneNumber,
      'userIds': userIds
    }
  })
}

export function getDeptUser() {
  return request({
    url: "/company/dept",
    method: "get"
  })
}

export function deleteDeptUser(deleteUserId) {
  return request({
    url: "/company/deleteDeptUser",
    method: "post",
    data: {
      'deleteUserId': deleteUserId
    }
  })
}

export function deleteCompanyUser(deleteUserId) {
  return request({
    url: "/company/deleteCompanyUser",
    method: "post",
    data: {
      'deleteUserId': deleteUserId
    }
  })
}



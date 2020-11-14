import request from "../util/request";


export function sendReport(file,type,addWatermark,approverPhoneNumber,secondApproverPhoneNumber) {
  let formData = new FormData();
  formData.append('file',file);
  formData.append('type',type);
  formData.append('addWatermark',addWatermark);
  formData.append('approverPhoneNumber',approverPhoneNumber);
  formData.append('secondApproverPhoneNumber',secondApproverPhoneNumber);
  return request({
    url: "/report/send",
    method: "post",
    data: formData
  })
}

export function getReportUrl(notificationId) {
  let formData = new FormData();
  formData.append('notificationId',notificationId);
  return request({
    url: "/report/get",
    method: "post",
    data: formData
  })
}


export function returnReport(file,notificationId) {
  let formData = new FormData();
  formData.append('file',file);
  formData.append('notificationId',notificationId);
  return request({
    url: "/report/return",
    method: "post",
    data: formData
  })
}

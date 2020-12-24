let baseUrl = "";
// console.log(process.env.NODE_ENV)
switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = "http://localhost:9000/"  //开发环境url
    break
  case 'production':
    baseUrl = "http://8.131.104.136:9000/"   //生产环境url
    break
}
export default baseUrl;

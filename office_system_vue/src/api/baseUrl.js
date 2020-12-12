let baseUrl = "";
// console.log(process.env.NODE_ENV)
switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = "http://localhost:9000/"  //开发环境url
    break
  case 'production':
    baseUrl = "http://118.31.166.90:9000/"   //生产环境url
    break
}
export default baseUrl;

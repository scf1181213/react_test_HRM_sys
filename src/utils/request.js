import { message } from "antd";
import axios from "axios";
import {getTokenCookie,getUsernameCookie} from "./cookies";
  
//第一部创建实例
const service = axios.create({
    baseURL: process.env.REACT_APP_API,
    timeout: 5000,
    headers: {'X-Custom-Header': 'foobar'}
});


//第二步，请求拦截
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么  Token,Username
    config.headers["Token"]=getTokenCookie();
    config.headers["Username"]=getUsernameCookie();
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });


//第三步，响应拦截
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    const data =response.data;
    if(data.resCode !==0){
      message.info(data.message); //全局错误提示
      return Promise.reject(response);
    }else{
      return response;
    }

  }, function (error) {
    // 对响应错误做点什么
    const data = error.request
    return Promise.reject(data);
  });

  export default service;
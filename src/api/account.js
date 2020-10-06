import service from "../../src/utils/request";

//登录接口

export function login_request(data){
    return service.request({
        url: "/login/",
        method: "post",
        data: data  //请求类型为post
    })
}

//验证码
export function get_code(data){
    return service.request({
        url: "/getSms/",
        method: "post",
        data: data  //请求类型为post
    })
}

// 注册接口
export function register_request(data){
    return service.request({
        url: "/register/",
        method: "post",
        data: data, //请求类型为post
    })
}
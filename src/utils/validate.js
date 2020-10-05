export const login_password_validate = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;  //登陆注册密码格式正则

const reg_email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/; //邮箱正则

export function validate_email(value){
    return reg_email.test(value)
}                           //邮箱验证
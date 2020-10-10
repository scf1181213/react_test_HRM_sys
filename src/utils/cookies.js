 import cookies from "react-cookies";

 const tokenAdmin = "adminToken";
 const userName = "userName";
//token,cookies
export function setTokenCookie(values){
    cookies.save(tokenAdmin, values);
}
export function getTokenCookie(values){
    return cookies.load(tokenAdmin);
}

//用户cookies
export function setUsernameCookie(values){
    cookies.save(userName,values);
}
export function getUsernameCookie(values){
    return cookies.load(userName);
}
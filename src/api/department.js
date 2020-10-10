import service from "../../src/utils/request";

export function departmentAdd(data){
    return service.request({
        url:"/department/add/",
        method:"post",
        data,
    })
}
import service from "../../src/utils/request";


//添加
export function departmentAdd(data){
    return service.request({
        url:"/department/add/",
        method:"post",
        data,
    })
}

//列表
export function GetDepartmentList(data){
    return service.request({
        url:"/department/list/",
        method:"post",
        data,
    })
}

//删除
export function departmentDelete(data){
    return service.request({
        url:"/department/delete/",
        method:"post",
        data,
    })
}

//禁启用
export function departmentStatus(data){
    return service.request({
        url:"/department/status/",
        method:"post",
        data,
    })
}

//详情
export function departmentDetail(data){
    return service.request({
        url:"/department/detailed/",
        method:"post",
        data,
    })
}

//编辑
export function departmentEdit(data){
    return service.request({
        url:"/department/edit/",
        method:"post",
        data,
    })
}
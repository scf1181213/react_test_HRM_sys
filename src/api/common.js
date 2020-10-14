import service from "../../src/utils/request";


//列表
export function Common(params){
    return service.request({
        url: params.url,
        method: params.method || "post",
        data: params.data,
    })
}
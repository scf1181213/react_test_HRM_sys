import {  Switch } from "react-router-dom";
import React, {Component} from "react";

//用户管理组件导入
import UserList from "../../compoments/users/list";
import UserAdd from "../../compoments/users/add";
//部门组件
import DepartmentList from "../../compoments/departments/List";
import DepartmentAdd from "../../compoments/departments/Add";
//私有路由组件
import PrivateRouter from "../../compoment_code/private_router/index";

class Contents extends Component{

    constructor(props){
        super(props);
        this.state = {

        };
    }
    render(){
        return(
            
            <Switch>
                <PrivateRouter exact component={UserList} path = "/admin/user/list"  />
                <PrivateRouter exact component={UserAdd} path = "/admin/user/add"  />
                <PrivateRouter exact component={DepartmentList} path = "/admin/department/List"  />
                <PrivateRouter exact component={DepartmentAdd} path = "/admin/department/Add"  />
             </Switch>
            
            
        )
        }
}

export default Contents;
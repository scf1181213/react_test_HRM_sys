import { BrowserRouter, Switch } from "react-router-dom";
import React, {Component} from "react";

//用户管理组件导入
import UserList from "../../compoments/users/list";
import UserAdd from "../../compoments/users/add";
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
             </Switch>
            
            
        )
        }
}

export default Contents;
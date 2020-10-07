import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
//引用组件

import Login from './compoments/login/Index';
import Admin from './compoments/admin/Index';

//私有路由组件
import PrivateRouter from "./compoment_code/private_router/index";
import UserAdd from './compoments/users/add';



class App extends React.Component{
 
  constructor(props){
    super(props);
    this.state= {};
  }

  render(){
    return(
      <BrowserRouter>

        <Switch>
        <Route exact render={() => <Login/>} path="/"/>
        <PrivateRouter component={Admin} path="/admin"/>
        </Switch>
      </BrowserRouter>
    )
  }
}


export default App;

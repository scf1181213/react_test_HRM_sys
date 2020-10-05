import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
//引用组件

import Index from './compoments/login/Index';



class App extends React.Component{
 
  render(){
    return(
      <BrowserRouter>
        <Switch>
        <Route component={Index} path="/"/>
        </Switch>
      </BrowserRouter>
    )
  }
}


export default App;

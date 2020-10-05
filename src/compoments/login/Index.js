import React, {Component} from "react";

import "./index.scss";

import Login from "./Login";
import Register from "./Register";

class Index extends Component{

    constructor(){
        super();
        this.state={
            formType: "login"
        };
        
    }

    switchForm = (value) =>{
        this.setState({
            formType:value
        })
    }
    
    
    render(){
        return(
            <div className="body-item"> 
                <div className="form-wrap"> 
                    {this.state.formType === "login" 
                    ? <Login setRegister = { this.switchForm}></Login> 
                    : <Register setLogin = { this.switchForm}></Register>}
                </div>
            </div>
            
        );
    }
}
export default Index
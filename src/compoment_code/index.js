import React, {Component} from "react";
//antd
import {  Button, message} from 'antd';

import {get_code} from "../api/account";
//验证码
import {validate_email} from "../utils/validate";
//定时器
let timer = null;
//class 组件
class Code extends Component{
    constructor(props){
        //初始化props值
         super(props);
         this.state = {
             username: props.username,
             code_button_disabled: false,
             code_button_loading: false,
             Code_text: "获取验证码",
             module: props.module
         }
    }

   
    //父组件获取
    componentWillReceiveProps(value){
        this.setState({
            username: value.username,
            module:value.module
        })
    }
    //组件销毁
    componentWillUnmount(){
        console.log('验证码组件销毁');
        clearInterval(timer);
    }

    //获取验证码
    getCode = () => {
        if(!this.state.username){
            message.warning("用户名不能为空");
            return 0;
        }
        //邮箱正则
        if(!validate_email(this.state.username)){
            message.warning("请输入正确的邮箱格式");
            return 0;
        }
        this.setState({
            code_button_disabled:true,
            code_button_loading:true,
            Code_text: "获取中"
        })
        const requestData={
            username: this.state.username,
            moudle: this.state.module
        }
        get_code(requestData).then(response => {
            this.countDowm();
            message.success(response.data.message);
            
        }).catch(error => {
            message.warning("验证码获取失败");
            this.setState({
                code_button_disabled:false,
                code_button_loading:false,
                Code_text: "重新获取"
            })
        })
    }

    //倒计时
    countDowm = () => {
        //定时器
        let sec = 60 ;
        this.setState({
            code_button_disabled: true,
            code_button_loading: false,
            Code_text: `${sec}s`
        })
        
        timer = setInterval(() =>{
            sec--;
            this.setState({
            Code_text: `${sec}s`
            });
            if(sec<0){
                clearInterval(timer);
                this.setState({
                    code_button_disabled: false,
                    code_button_loading: false,
                    Code_text: `重新获取`
                    });
            }
        }, 1000);    

    }

    render(){
        return <Button type="danger" loading = {this.state.code_button_loading} block disabled={this.state.code_button_disabled} onClick={this.getCode}>{this.state.Code_text}</Button>
    }
}


export default Code;
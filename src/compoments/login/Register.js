import React, {Component,Fragment} from "react";
//ANTD
import { Form, Input, Button, Row,Col,message} from 'antd';
import { UserOutlined,LockOutlined,MessageOutlined  } from '@ant-design/icons';
import {validate_password} from "../../utils/validate";
//导入验证码组件
import Code from "../../compoment_code/code/index";
//API
import {register_request} from "../../api/account";
//加密
import CryptoJS from 'crypto-js';


class Register extends Component{

   constructor(){
       super();
       this.state={
           username:"",
           password:"",
           sec_passwored:"",
           code:"",
           module: "register"
       };
       this.onFinish= this.onFinish.bind(this);
   }
   
   onFinish = (values) => {
       if(this.state.password!==this.state.sec_passwored){
        message.warning("两次密码输入不一致");
        return 0;
       }
       const request_data = {
           username: this.state.username,
           password: CryptoJS.MD5(this.state.password).toString(),
           code: this.state.code
       }
       register_request(request_data).then(Response=>{
           const data = Response.data;
           message.success(data.message);
           if(data.resCode === 0||data.resCode===200){
            this.toggleForm();
           }
       }).catch(error=>{
        console.log(Response);
       });
    console.log('received values of form:',values);
   }

    toggleForm = () =>{
        this.props.setLogin("login");
    }

    //input变化输入处理
    inputChange = (module,e) => {
        let value = e.target.value;
        
        this.setState({
            [module]:value
        })
        
    }

   render(){
       const {username,module,password,sec_passwored,code} =  this.state;
       return(
        <Fragment>
        
             <div className="form-header">
                 <h4 className='column'>注册</h4>
                 <span className='register'onClick={this.toggleForm}>登录</span>
             </div>
             
             <div className="form-content">
                 <Form
                 name="normal_login"
                 className="login-form"
                 initialValues={{ remember: true }}
                 onFinish={this.onFinish}
                 >
                    <Form.Item name="username" rules={
                    [
                        { required: true, message: '邮箱不能为空!' },
                        { type:"email",message:"请输入正确的邮箱格式"}
                        ]
                    }>
                    <Input onChange = {this.inputChange.bind(this,'username')} value = {username} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="输入注册邮箱" />
                    </Form.Item>
                    <Form.Item name="password" rules={
                        [
                            { required: true, message: '密码不能为空!' },
                            ({getFieldValue}) => ({
                                validator(role,value){
                                    let passwords_value=getFieldValue('confirm');
                                    if(!validate_password(value)){
                                        return  Promise.reject("请输入字母数字组合不少于6位!");
                                    }
                                    if(passwords_value && value!==passwords_value){
                                        return Promise.reject("两次密码不一致");
                                    }
                                    return Promise.resolve();
                                }
                            }),
                            // { pattern:login_password_validate , message:"请输入字母数字组合不少于6位"}
                        ]
                            
                    }>
                    <Input value = {password} onChange = {this.inputChange.bind(this,'password')}  prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="输入密码"/>
                    </Form.Item>
                    <Form.Item name="confirm" rules={
                        [
                            { required: true, message: '重复密码不能为空!' },
                            ({getFieldValue}) => ({
                                validator(role,value){
                                    if(!validate_password(value)){
                                        return  Promise.reject("请输入字母数字组合不少于6位!");
                                    }
                                    return Promise.resolve();
                                }
                            }),
                            ({ getFieldValue }) => ({  //es6解构
                                validator(rule, value) {
                                  if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject('两次输入的密码不匹配!');
                                },
                              }),
                        ]
                    }>
                     <Input value={sec_passwored}  onChange = {this.inputChange.bind(this,'sec_passwored')}  prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="再次输入密码"/>
                    </Form.Item>
                    <Form.Item name="code" rules={[{ required: true, message: '输入验证码!' }]}>
                     <Row gutter={13}>
                            <Col span={16}><Input onChange = {this.inputChange.bind(this,'code')} value={code} prefix={<MessageOutlined  className="site-form-item-icon" />} placeholder="Code" /></Col>
                         <Col span={8}>
                             <Code username = {username} module={module}/>
                             </Col>
                     </Row>
                    </Form.Item>
                    <Form.Item> 
                     <Button type="primary" htmlType="submit" className="login-form-button" block >注册</Button>  
                    </Form.Item>
                 </Form> 
             </div>
         
     
     </Fragment>)
   }

}

export default Register;
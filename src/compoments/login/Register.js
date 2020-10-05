import React, {Component,Fragment} from "react";
//ANTD
import { Form, Input, Button, Row,Col} from 'antd';
import { UserOutlined,LockOutlined,MessageOutlined  } from '@ant-design/icons';
import {login_password_validate} from "../../utils/validate";
//导入验证码组件
import Code from "../../compoment_code/index";


class Register extends Component{

   constructor(){
       super();
       this.state={
           username:""
       };
       this.onFinish= this.onFinish.bind(this);
   }
   
   onFinish = (values) => {
    console.log('received values of form:',values);
   }

    toggleForm = () =>{
        this.props.setLogin("login");
    }

    //用户名变化输入处理
    inputChange = (e) => {
        let value = e.target.value;
         
        console.log(value);
        this.setState({
            username: value
        })
        
    }

   render(){
       const {username} =  this.state;
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
                 onFinish={()=>this.onFinish}
                 >
                    <Form.Item name="username" rules={
                    [
                        { required: true, message: '邮箱不能为空!' },
                        { type:"email",message:"请输入正确的邮箱格式"}
                        ]
                    }>
                    <Input onChange = {this.inputChange} value = {username} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="输入注册邮箱" />
                    </Form.Item>
                    <Form.Item name="password" rules={
                        [
                            { required: true, message: '密码不能为空!' },
                            { pattern:login_password_validate , message:"请输入字母数字组合不少于6位"}
                        ]
                            
                    }>
                    <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="输入密码"/>
                    </Form.Item>
                    <Form.Item name="confirm" rules={
                        [
                            { required: true, message: '重复密码不能为空!' },
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
                     <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="再次输入密码"/>
                    </Form.Item>
                    <Form.Item name="code" rules={[{ required: true, message: '输入验证码!' }]}>
                     <Row gutter={13}>
                         <Col span={16}><Input prefix={<MessageOutlined  className="site-form-item-icon" />} placeholder="Code" /></Col>
                         <Col span={8}>
                             <Code username = {username}/>
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
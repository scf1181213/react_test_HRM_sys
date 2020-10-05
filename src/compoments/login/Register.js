import React, {Component,Fragment} from "react";
//ANTD
import { Form, Input, Button, Row,Col} from 'antd';
import { UserOutlined,LockOutlined,MessageOutlined  } from '@ant-design/icons';
import {login_password_validate} from "../../utils/validate"


class Register extends Component{

   constructor(){
       super();
       this.state={};
       this.onFinish= this.onFinish.bind(this);
   }
   
   onFinish = (values) => {
    console.log('received values of form:',values);
   }

    toggleForm = () =>{
        this.props.setLogin("login");
    }

   render(){
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
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="234156743@qq.com" />
                    </Form.Item>
                    <Form.Item name="password" rules={
                        [
                            { required: true, message: '密码不能为空!' },
                            { pattern:login_password_validate , message:"请输入字母数字组合不少于6位"}
                        ]
                            
                    }>
                    <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password"/>
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
                     <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="SecondPassword"/>
                    </Form.Item>
                    <Form.Item name="code" rules={[{ required: true, message: '输入验证码!' }]}>
                     <Row gutter={13}>
                         <Col span={16}><Input prefix={<MessageOutlined  className="site-form-item-icon" />} placeholder="Code" /></Col>
                         <Col span={8}><Button type="primary" danger block>获取验证码</Button></Col>
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
import React, {Component,Fragment} from "react";
//ANTD
import { Form, Input, Button, Row,Col} from 'antd';
import { UserOutlined,LockOutlined,MessageOutlined } from '@ant-design/icons';
//验证
import {login_password_validate} from "../../utils/validate";
//接口导入
import {login_request} from "../../api/account";
//导入验证码组件
import Code from "../../compoment_code/index";
//class 组件
class Login extends Component{

    constructor(){
       super();
       this.state={
           username: "",
        //    code_button_disabled: false,
        //    code_button_loading: false,
           Code_text: "获取验证码"
       };
       //react没有数据双向绑定
    } 
   
    getFormValues = (values) => {
        login_request( ).then(response => {
            console.log(response)
        }).catch(error =>{

        })
        console.log('received values of form:',values);
    }

    //登录注册切换
    toggleForm = () =>{
        this.props.setRegister("register");
    }


    //用户名变化输入处理
    inputChange = (e) => {
        let value = e.target.value;
        
        this.setState({
            username: value
        })
        
    }

   render(){
       const{username} = this.state;
       return(
       <Fragment>
           
           <div className="form-header">
                    <h4 className='column'>登录</h4>
                    <span className='register' onClick={this.toggleForm}>账号注册</span>
                </div>
                
                <div className="form-content">
                    <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={this.getFormValues}
                    >
                    <Form.Item name="username" rules={
                        [
                            { required: true, message: '请输入用户邮箱!' },
                            { type:"email",message:"请输入正确的邮箱格式"}
                        ]
                    }>
                        <Input value={username} onChange = {this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="password" rules={
                        [
                            { required: true, message: '密码不能为空!' },
                            { pattern:login_password_validate , message:"请输入字母数字组合不少于6位"}
                        ]
                    }>
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password"/>
                    </Form.Item>
                    <Form.Item name="code" rules={[{ required: true, message: '输入验证码!' }]}>
                        <Row gutter={13}>
                            <Col span={16}><Input prefix={<MessageOutlined  className="site-form-item-icon" />} placeholder="Code" /></Col>
                            <Col span={8}>
                                <Code username={username}/>
                                {/* <Button type="danger" loading = {code_button_loading} block disabled={code_button_disabled} onClick={this.getCode}>{Code_text}</Button> */}
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item> 
                        <Button type="primary" htmlType="submit" className="login-form-button" block >登录</Button>  
                    </Form.Item>
                    </Form> 
                </div> 
        
        </Fragment>)
   }

}

export default Login;
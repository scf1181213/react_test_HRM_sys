import React, {Component,Fragment} from "react";
//ANTD
import { Form, Input, Button, Row,Col, message} from 'antd';
import { UserOutlined,LockOutlined,MessageOutlined } from '@ant-design/icons';
//验证
import {login_password_validate,validate_email} from "../../utils/validate";
//接口导入
import {login_request,get_code} from "../../api/account";


class Login extends Component{

    constructor(){
       super();
       this.state={
           username: "",
           code_button_disabled: false,
           code_button_loading: false,
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

    //倒计时
    countDowm = () => {
        //定时器
        let timer = null ;
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
            console.log(sec);
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

    //获取验证码
    getCode = () => {
        if(!this.state.username){
            message.warning("用户名不能为空");
            return 0;
        }
        this.setState({
            code_button_disabled:true,
            code_button_loading:true,
            Code_text: "获取中"
        })
        const requestData={
            username: this.state.username,
            moudle: "login"
        }
        get_code(requestData).then(response => {
            this.countDowm();
            // message.warning("验证码已发送");
            
        }).catch(error => {
            message.warning("验证码获取失败");
            this.setState({
                code_button_disabled:false,
                code_button_loading:false,
                Code_text: "重新获取"
            })
        })
    }

    //用户名变化输入处理
    inputChange = (e) => {
        let value = e.target.value;
        //邮箱正则
        if(validate_email(value)){
            this.setState({
                username: value,
                code_button_disabled:false
            })
        }
        
    }

   render(){
       const{username,code_button_disabled,code_button_loading,Code_text} = this.state;
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
                            <Col span={8}><Button type="danger" loading = {code_button_loading} block disabled={code_button_disabled} onClick={this.getCode}>{Code_text}</Button></Col>
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
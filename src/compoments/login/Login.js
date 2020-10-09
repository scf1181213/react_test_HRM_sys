import React, {Component,Fragment} from "react";
import {withRouter } from 'react-router-dom';
//ANTD
import { Form, Input, Button, Row,Col,message} from 'antd';
import { UserOutlined,LockOutlined,MessageOutlined } from '@ant-design/icons';
//验证
import {login_password_validate} from "../../utils/validate";
//接口导入
import {login_request} from "../../api/account";
//导入验证码组件
import Code from "../../compoment_code/code/index";
//加密
import CryptoJS from 'crypto-js';
//session
import {setToken} from '../../utils/session';

//class 组件
class Login extends Component{

    constructor(){
       super();
       this.state={
           username: "",
        //    code_button_disabled: false,
        //    code_button_loading: false,
           Code_text: "获取验证码",
           paaaword:"",
           code:"",
           module: "login",
           loading:false
       };
       //react没有数据双向绑定
    } 
   
    //登录处理
    getFormValues = (values) => {
        this.setState({
            loading:false
        })
        const request_data = {
            username:this.state.username,
            password:CryptoJS.MD5(this.state.password).toString(),
            code:this.state.code,
        }
        //登陆验证
        login_request(request_data).then(Response => {
            const data = Response.data;
            if(data.resCode!==0){
                message.warning(data.message);
                return false;
            }
            message.success(data.message);
            this.setState({
                loading:false
            })
            setToken(data.token);
            //路由跳转
            this.props.history.push('/admin');
        }).catch(error =>{
            this.setState({
                loading:false
            })
        })
    }

    //登录注册切换
    toggleForm = () =>{
        this.props.setRegister("register");
    }


    //input变化输入处理
    inputChange = (module,e) => {
        let value = e.target.value;
        
        this.setState({
            [module]:value
        })
        
    }

   render(){
       const{username,module,code,password,loading} = this.state;
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
                        <Input value={username} onChange = {this.inputChange.bind(this,'username')} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="password" rules={
                        [
                            { required: true, message: '密码不能为空!' },
                            { pattern:login_password_validate , message:"请输入字母数字组合不少于6位"}
                        ]
                    }>
                        <Input value={password} onChange={this.inputChange.bind(this,'password')} prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password"/>
                    </Form.Item>
                    <Form.Item name="code" rules={[{ required: true, message: '输入验证码!' }]}>
                        <Row gutter={13}>
                            <Col span={16}><Input value={code} onChange={this.inputChange.bind(this,'code')} prefix={<MessageOutlined  className="site-form-item-icon" />} placeholder="Code" /></Col>
                            <Col span={8}>
                                <Code username={username} module={module}/>
                                {/* <Button type="danger" loading = {code_button_loading} block disabled={code_button_disabled} onClick={this.getCode}>{Code_text}</Button> */}
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item> 
                        <Button loading={loading} type="primary" htmlType="submit" className="login-form-button" block >登录</Button>  
                    </Form.Item>
                    </Form> 
                </div> 
        
        </Fragment>)
   }

}

export default withRouter(Login);
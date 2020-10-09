
import React, {Component} from "react";
import {Button, Form,Input} from "antd";



class DepartmentAdd extends Component{

    constructor(props){
        super(props);
        this.state = {
            formLayout: {span:2},
            warpperCol: {span : 22}
        };
    }
    render(){
        return(
            <div>
                <Form onFinish={this.onSubmit} labelCol={this.state.formLayout} wrapperCol={this.state.warpperCol}>
                    <Form.Item label="部门名称" name="name">
                        <Input/>
                    </Form.Item>
                    <Form.Item label="人员数量" name="number">
                        <Input/>
                    </Form.Item>
                    <Form.Item label="禁启用" name="status">
                        <Input/>
                    </Form.Item>
                    <Form.Item label="描述" name="content">
                        <Input.TextArea/>
                    </Form.Item>
                    <Form.Item label="" name="">
                        <Button type="primary" htmlType="submit">确定</Button>
                    </Form.Item>
                </Form>
            </div>
        )
        }
}

export default DepartmentAdd;
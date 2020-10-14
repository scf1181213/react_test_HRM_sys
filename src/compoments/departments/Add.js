import React, {Component} from "react";
import {Button, Form,Input, InputNumber, message, Radio} from "antd";
import {departmentAdd,departmentDetail,departmentEdit}from "../../api/department"; 



class DepartmentAdd extends Component{

    constructor(props){
        super(props);
        this.state = {
            formLayout:{
                labelcol: {span:2},
                warppercol: {span : 22}
            },
            status: "",
            id:"",
        };

        
    }
    
    onSubmit = (value)=>{
        if(!value.name) {
            message.error("部门不能为空");
            return false;
        }
        if(!value.number||value.number===0){
            message.error("部门人数不能为空");
            return false;
        }
        if(!value.content){
            message.error("描述不能为空");
            return false;
        }
        //添加或编辑
        this.state.id? this.onEdit(value):this.onAdd(value);
        
    }

    componentDidMount(){
        
        if(this.props.location.state){
            const id=this.props.location.state.id;
            this.setState({
                id:id,
            })
            this.getDetailed(id);
        }
        return false;
    }

    //添加信息
    onAdd(value){
        departmentAdd(value).then( response => {
            const data=response.data;
            message.info(data.message);
            this.props.history.push('/admin/department/list');
        }).catch(error =>{
            message.error("添加失败");
        })
    }


    //编辑信息
    onEdit(value){
        const requestData= value;
        requestData.id=this.state.id;
        departmentEdit(value).then( response => {
            const data=response.data;
            message.info(data.message);
            this.props.history.push('/admin/department/list');
        }).catch(error =>{
            message.error("编辑失败");
        })
    }

    //get数据详情
    getDetailed = (id) =>{
        if(!this.props.location.state){ return false;}
        departmentDetail({id:id}).then(response =>{
            this.refs.form.setFieldsValue(response.data.data)
        })
    }

    render(){
        return(
            <div>
                <Form ref="form" onFinish={this.onSubmit} initialValues={{status:true,number:0}} {...this.state.formLayout}>
                    <Form.Item label="部门名称" name="name">
                        <Input/>
                    </Form.Item>
                    <Form.Item label="人员数量" name="number">
                        <InputNumber/>
                    </Form.Item>
                    <Form.Item label="禁启用" name="status">
                        <Radio.Group>
                            <Radio value = {false}>禁用</Radio>
                            <Radio value = {true}>启用</Radio>
                        </Radio.Group>
                        
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
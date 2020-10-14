
import React, {Component, Fragment} from "react";
import {Form,Input,Button, Table,Switch, message,Modal} from "antd";

import {Link} from "react-router-dom";

//api
import {GetDepartmentList,departmentDelete,departmentStatus} from "../../api/department";



class DepartmentList extends Component{

    constructor(props){
        super(props);
        this.state = {
            //请求参数
            pageNumber: 1,
            pageSize: 10,
            keyWord:"",
            //复选框数据
            selectRowKeys:[],
            //警告弹窗
            visible:false,
            //数据id
            id:"",

            //表格加载
            loadingTable: false,
            //表格
            columns:[
                {title: "部门名称",dataIndex:"name",key:"name"},
                {
                    title: "禁启用",
                    dataIndex:"status",
                    key:"status",
                    render:(text,rowData) => {
                        return <Switch onChange={()=>this.setDepartmentStatus(rowData)} checkedChildren="启用" unCheckedChildren="关闭" defaultChecked={rowData.status ==="1"? true:false} />
                    }
                },
                {title: "人员数量",dataIndex:"number",key:"number"},
                {
                    title: "操作",
                    dataIndex:"operation",
                    key:"operation",
                    width:"200px",
                    render:(text,rowData)=>{
                        return (
                            <div className="inline-button">
                                
                                <Button type="primary">
                                    <Link to={{pathname: "/admin/department/add",state:{id:rowData.id}}}> 编辑</Link>
                                </Button>
                                
                                <Button onClick={()=>this.dataDelete(rowData.id)} type="default">删除</Button>
                            </div>                           
                        )
                    }
                
                }
                
            ],
            dataSource:[

            ]
        };
    }

    //生命周期挂载
    componentDidMount(){
        this.loadingData();
    }

    //禁启用
    setDepartmentStatus = (rowData)=>{
        if(!rowData.status) { return false;}
        const requestData={
            id:rowData.id,
            status:rowData.status === "1"? false:true

        }
        departmentStatus(requestData).then(response =>{
            if(response.data.resCode===0){
                message.success('修改成功');
                
            }
        })
    }

    //数据删除
    dataDelete = (id)=> {
        if(!id){ return false; }
        this.setState({
            visible:true,
            id:id
        })
        
    }

    //弹窗
    hideModal = (id) =>{
        if(!id){
            this.setState({
                visible:false
            })
            return false;
        }
        departmentDelete({id}).then(response => {
            const resCode = response.data.resCode;
            if(resCode===0){
                message.success('删除成功');
                this.loadingData();
                this.setState({
                    visible:false
                })
            }
        })
        
    }

    //获取列表数据
    loadingData = ()=>{
        const{pageSize,pageNumber,keyWord} = this.state;
        const requestData = {
            pageNumber:pageNumber,
            pageSize:pageSize

        }
        if(keyWord){
            requestData.name = keyWord
        }
        this.setState({loadingTable:true});
        GetDepartmentList(requestData).then(response => {
            const responseData = response.data.data;

            if(requestData){
                this.setState({
                    dataSource:responseData.data
                })
                this.setState({loadingTable:false});
            }
        }).catch(error =>{
            this.setState({loadingTable:false});
        })
    }

    //批量删除

    //搜索
    onFinish = (value) =>{
        this.setState({
            keyWord:value.DepartmentName,
            pageNumber: 1,
            pageSize: 10
        })
        this.loadingData();
    }

    //复选框
    onCheckbox = (selectRowKeys)=>{
        this.setState(
            {
                selectRowKeys
            }
        )
    }

    departmentDeleteSome

    render(){
        const { columns,dataSource,id,loadingTable } = this.state
        const rowSelection = {
            onChange:this.onCheckbox
        }
        return(
            <div>
                <Fragment>
                    <Form layout="inline" onFinish={this.onFinish}>
                        <Form.Item
                            label="部门名称"
                            name="DepartmentName"
                        >
                            <Input placeholder="请输入部门名称"/>
                        </Form.Item>
                        <Form.Item shouldUpdate={true}>
                        <Button type="primary" htmlType="submit">搜索</Button>
                    </Form.Item>
                    </Form>
                    <div className='department-table'>
                        <Table loading={loadingTable} rowSelection={rowSelection} rowKey="id" columns={columns}  dataSource={dataSource} bordered={true}></Table>
                        <Button onClick={() =>this.departmentDeleteSome()}>批量删除</Button>
                    </div>

                    <Modal
                        title="提示"
                        visible={this.state.visible}
                        onOk={()=>this.hideModal(id)}
                        onCancel={()=>this.hideModal(null)}
                        okText="确认"
                        cancelText="取消"
                    >
                        <p><strong>确定删除吗？</strong></p>
                        
                    </Modal>
                    
                </Fragment>
            </div>
        )
    }
}

export default DepartmentList;
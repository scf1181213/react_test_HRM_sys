import React,{Component,Fragment}  from 'react';
import { Form,Input,Table,Pagination,Row,Col,Button,Modal,message} from "antd";
import {Common} from "../../api/common";

//PROPTYPES
import PropTypes from "prop-types";

class TableComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
            pageNumber:1,
            pageSize:10,
            keyWord: "",
            loadingTable:false,
            //复选框数据
            selectRowKeys:[],
            //数据id
            id:"",
            dataSource:[],
            //页码
            total:0,
        }
    }

    //生命周期挂载
    componentDidMount(){
        this.loadingData();
    }

    
    //搜索
    onFinish = (value) =>{
        console.log(value)
        this.setState({
            keyWord:value.DepartmentName,
            pageNumber: 1,
            pageSize: 10
        })
        this.loadingData();
    }

    //获取列表数据
    loadingData = ()=>{
        const{pageSize,pageNumber,keyWord} = this.state;
        const requestData = {
            url:this.props.tableConfig.list_url,
            method:this.props.tableConfig.method,
            data:{
                pageNumber:pageNumber,
                pageSize:pageSize
            }
        }
        if(keyWord){
            requestData.data.name = keyWord
        }
        console.log(requestData);
        this.setState({loadingTable:true});
        Common(requestData).then(response => {
            const responseData = response.data.data;

            if(responseData){
                this.setState({
                    dataSource:responseData.data,
                    total: responseData.total,
                })
                this.setState({loadingTable:false});
            }
        }).catch(error =>{
            this.setState({loadingTable:false});
        })
    }

    //复选框
    onCheckbox = (selectRowKeys)=>{
        this.setState(
            {
                selectRowKeys
            }
        )
    }
    //当前页码
    onChangeCurrentPage = (page,pageSize) =>{
        this.setState({
            pageNumber:page,
            pageSize:pageSize
        },()=>{
            this.loadingData();
        })
        
    }

    //删除弹窗
    hideModal = (id) =>{
        if(!id){
            this.setState({
                visible:false
            })
            return false;
        }
        const requestData = {
            url:this.props.tableConfig.delete_url,
            method:this.props.tableConfig.method,
            data:{
                id:id,
            }
        }
        Common(requestData).then(response => {
            const resCode = response.data.resCode;
            if(resCode===0){
                message.success('删除成功');
                
                this.setState({
                    visible:false
                })
            }
            this.loadingData();
        })
        
    }

    //数据删除
    dataDelete = (id)=> {
        if(!id){  //批量删除
            if(this.state.selectRowKeys.length ===0 ){
                return false; 
            }
            id = this.state.selectRowKeys.join();
        }
        this.setState({
            visible:true,
            id:id
        })
        
    }

    render(){
        const {thead,checkbox,rowKey,batchButton} = this.props.tableConfig;
        const {loadingTable,total} = this.state;
        const rowSelection = {
            onChange:this.onCheckbox
        }
        return (
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
                <Table 
                className='department-table'
                pagination = {false} 
                loading={loadingTable}
                rowSelection={checkbox? rowSelection : null} 
                rowKey={rowKey ? rowKey: "id"} 
                columns={thead} 
                dataSource = {this.state.dataSource } 
                bordered/>

                <Row>
                    <Col span={8}>
                    {batchButton  && <Button onClick={() =>this.dataDelete(this.state.id)}>批量删除</Button>}
                    </Col>
                    <Col span={16}>
                        <Pagination
                        className="page-right"
                        onChange={this.onChangeCurrentPage}
                        total={total}
                        showSizeChanger
                        showQuickJumper
                        showTotal={total => `一共 ${total} 条`}
                        />
                    </Col>
                </Row>

                <Modal
                        title="提示"
                        visible={this.state.visible}
                        onOk={()=>this.hideModal(this.state.id)}
                        onCancel={()=>this.hideModal(null)}
                        okText="确认"
                        cancelText="取消"
                    >
                        <p><strong>确定删除吗？</strong></p>
                        
                    </Modal>
                
            </Fragment>
            
            )
    }

}
//数据校验类型
TableComponent.propTypes = {
    tableConfig:PropTypes.object,
}
//默认数据
TableComponent.defaultProps = {
    batchButton: true
}

export default TableComponent;

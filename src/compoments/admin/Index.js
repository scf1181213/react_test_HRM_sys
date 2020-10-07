import React, {Component} from "react";
import { Layout} from 'antd';  //antd布局
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
//导入组件
import Aside from "./admin_components/aside";
import Header_component from "./admin_components/header";
import Contents from "../../compoment_code/contents/index";
import "./layout.scss";


const {Sider, Header, Content} = Layout;
class Admin extends Component{

    constructor(props){
        super(props);
        this.state = {

        };
    }
    render(){
        return(
            <Layout className="layout-wrap">
                <Sider width="250px">
                    <Aside/>
                </Sider>
                <Layout>
                    <Header className="layout-header">

                    </Header>
                    <Content className='layout-content'>
                        <Contents/>
                    </Content>
                </Layout>
            </Layout>
        )
        }
}

export default Admin;
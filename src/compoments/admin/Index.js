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
            collapsed: false,
        };
    }

    componentWillMount(){
        const getSessionCollapsed= JSON.parse(sessionStorage.getItem("collapsed"));
        this.setState({
            collapsed: getSessionCollapsed,
        })
    }

    toggleCollapsed = ()=>{
        const collapsed = !this.state.collapsed
        this.setState({
            collapsed: collapsed,
            fatherPath: sessionStorage.getItem('openkeys')
        })
    }

    render(){
        return(
            
            <Layout className="layout-wrap">
                <Header className="layout-header">
                        <Header_component toggleCollapsed={this.toggleCollapsed} collapsed={this.state.collapsed} />
                    </Header>
                
                <Layout>
                <Sider width="250px" collapsed={this.state.collapsed}>
                    <Aside />
                </Sider>
                    <Content className='layout-content'>
                        <Contents/>
                    </Content>
                </Layout>
            </Layout>
        )
        }
}

export default Admin;
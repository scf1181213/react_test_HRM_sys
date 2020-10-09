import React, {Component,Fragment} from "react";
import { Menu } from 'antd';
import { UserOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Router from "../../../router/index";

import "./aside.scss";
import { Link, withRouter } from "react-router-dom";

const { SubMenu } = Menu;

class Aside extends Component{

    constructor(props){
        super(props);
        this.state = {
            selectedkeys:['/admin/user/list'],
            openkeys:['/admin/user']
            
        };
    }

    //生命周期，过滤路由
    componentDidMount(){
        const pathname= this.props.location.pathname; 
        if(pathname.split('/').length>2){ 
            const fatherPath=pathname.split("/").slice(0,3).join('/');
            this.setState({
                selectedkeys: [pathname],
                openkeys: [fatherPath]
            })
        }
        
    }

    // 选中菜单

    selectMenu = ({item,key,keyPath,domEvent}) =>{
    
        this.setState({
            selectedkeys: [key],
            openkeys: [keyPath[keyPath.length-1]]
        })
        
        sessionStorage.setItem('openkeys',keyPath[keyPath.length-1]);

    }
    //打开菜单
    openMenu = (openKeys) =>{
        this.setState({
            openkeys: [openKeys[openKeys.length-1]]
        })

    }

    //无子级菜单处理
    renderMenu = ({title,key}) => {
        return <Menu.Item key={key}>
            <Link to={key}><span>{title}</span></Link>
            
            </Menu.Item>
    }
    //子级菜单处理
    renderSubMenu = ({title,key,child}) => {
        return <SubMenu key={key} icon={<UserOutlined />} title={title}>
            {
                child && child.map(item => {
                    return item.child && item.child.length>0 ? this.renderSubMenu(item) : this.renderMenu(item)
                })
            }
                </SubMenu>
    }
    render(){
        const {selectedkeys, openkeys}  = this.state;
        return(
            <Fragment>
                
                <Menu 
                    triggerSubMenuAction = "hover"
                    onClick = {this.selectMenu}
                    theme = 'dark'
                    mode="inline"
                    onOpenChange={this.openMenu}
                    selectedKeys={selectedkeys}
                    openKeys={openkeys}
                    style={{ height: '100%', borderRight: 0 }}
                    >
                        {
                            Router&&Router.map(firstItem => {
                                return firstItem.child&& firstItem.child.length>0 ? this.renderSubMenu(firstItem) : this.renderMenu(firstItem)  ;
                            })
                        }

                    </Menu>
            
                    
            </Fragment>
        )
        
    }
}

export default withRouter(Aside) ;
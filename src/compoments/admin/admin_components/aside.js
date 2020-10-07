import React, {Component,Fragment} from "react";
import { Menu } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Router from "../../../router/index";

import "./aside.scss";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;


class Aside extends Component{

    constructor(props){
        super(props);
        this.state = {

        };
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
        return(
            <Fragment>
                <h1 className = "logo"><span></span></h1>
                <Menu 
                    theme = 'dark'
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
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

export default Aside;
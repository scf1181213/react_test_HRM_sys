import React, {Component,Fragment} from "react";
import { MenuFoldOutlined } from '@ant-design/icons';
import {Image} from "antd";
//css
import "./aside.scss";


class Header_component extends Component{

    constructor(props){
        super(props);
        this.state = {
        };
    }

   //生命周期监听父级值变化
   componentWillReceiveProps({collapsed}){
///
   }

    render(){
        return(
            <Fragment >
                <div >
                    <span className={this.props.collapsed ?"collapsed-icon-close":"collapsed-icon" } onClick={this.props.toggleCollapsed} >
                        {
                            this.props.collapsed ?
                            <div>
                                <MenuFoldOutlined/>
                            </div>
                            :
                            <Image src="http://nttjjd.net/style/img/logo1.png"/> 
                        }
                        </span>
                    <img></img>
                </div>     
            </Fragment>
        )
        }
}

export default Header_component;
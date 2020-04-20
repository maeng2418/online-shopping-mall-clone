import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

const RightMenu = (props) => (
    props.user.userData && !props.user.userData.isAuth ?

        <Menu mode={props.mode}>
            <Menu.Item key="mail">
                <Link to="/login">Signin</Link>
            </Menu.Item>
            <Menu.Item key="app">
                <Link to="/register">Signup</Link>
            </Menu.Item>
        </Menu>
        :
        <Menu mode={props.mode}>
            <Menu.Item key="upload">
                <Link to="/product/upload">UPLOAD</Link>
            </Menu.Item>
            <Menu.Item key="cart" style={{height: '2.5rem'}}>
                <Badge count={0}>
                <Link to="/user/cart" style={{marginRight: -15, color: '#667777'}}>
                    <ShoppingCartOutlined style={{fontSize: 30}}/>
                </Link>
                </Badge>
            </Menu.Item>
            <Menu.Item key="logout">
                <a onClick={props.logoutHandler}>LOGOUT</a>
            </Menu.Item>
        </Menu>
)

export default RightMenu;

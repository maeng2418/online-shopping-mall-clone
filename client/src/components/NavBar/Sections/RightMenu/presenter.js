import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

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
            <Menu.Item key="logout">
                <a onClick={props.logoutHandler}>Logout</a>
            </Menu.Item>
        </Menu>
)

export default RightMenu;

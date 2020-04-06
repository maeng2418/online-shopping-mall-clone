import React from 'react';
import { withRouter } from 'react-router-dom';
import RightMenu from './presenter';

const Container = (props) => {

    const logoutHandler = () => {
        props.logout().then(response => {
            if (response.payload.success) {
                localStorage.removeItem('userId');
                props.history.push('/login');
            } else {
                alert("로그아웃 하는데 실패했습니다.")
            }
        })
    
    }

    return (
        <RightMenu user={props.user} mode={props.mode} logoutHandler={logoutHandler} />
    );
};

export default withRouter(Container);
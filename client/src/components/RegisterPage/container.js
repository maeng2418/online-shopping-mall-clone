import React from 'react';
import { withRouter } from 'react-router-dom';
import RegisterPage from './presenter';

const Container = (props) => {

  const onSubmitHandler = (body) => {

    if(body.password !== body.confirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
    }

    props.registerUser(body)
    .then(response => {
      if(response.payload.success){
        props.history.push('/login');
      } else {
        alert("Failed to sign up");
      }
    })
  }

  return (
    <RegisterPage onSubmitHandler={onSubmitHandler} />
  );
}

export default withRouter(Container);

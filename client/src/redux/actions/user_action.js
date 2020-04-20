import axios from 'axios';
import { USER_SERVER } from 'components/Config';
import {
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER,
    AUTH_USER,
    ADD_TO_CART_USER,
} from './types';

const loginUser = (dataTosubmit) => {
    dataTosubmit.remember ? localStorage.setItem('email', dataTosubmit.email) : localStorage.clear('email');
    const request = axios.post(`${USER_SERVER}/login`, dataTosubmit)
    .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload: request
    }
}

const registerUser = (dataTosubmit) => {
    
    const request = axios.post(`${USER_SERVER}/register`, dataTosubmit)
    .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload: request
    }
}

const logout = () => {

    const request = axios.get(`${USER_SERVER}/logout`)
        .then(response => response.data)

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

const auth = () => {

    const request = axios.get(`${USER_SERVER}/auth`)
        .then(response => response.data)

    return {
        type: AUTH_USER,
        payload: request
    }
}

const addToCart = (_id) => {
    const request = axios.get(`${USER_SERVER}/addToCart?productId=${_id}`)
        .then(response => response.data);

    return {
        type: ADD_TO_CART_USER,
        payload: request
    }
}

const userActionCreators = {
    loginUser,
    registerUser,
    logout,
    auth,
    addToCart
};

export default userActionCreators;
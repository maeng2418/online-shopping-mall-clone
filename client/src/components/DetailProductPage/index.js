import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Row, Col } from 'antd';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import { withRouter } from 'react-router-dom';
import userActionCreators from 'redux/actions/user_action';
import { useDispatch } from 'react-redux';

const DetailProductPage = (props) => {

    const dispatch = useDispatch();
    const productId = props.match.params.productId;
    const [Product, setProduct] = useState([]);

    useEffect(() => {
        Axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                setProduct(response.data[0]); // 하나만 가져옴.
            })


    }, []);

    const addToCartHandler = (productId) => {
        dispatch(userActionCreators.addToCart(productId))
    };

    return (
        <div className="postPage" style={{ width: '100%', padding: '3rem 4rem' }}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Product.title}</h1>
            </div>
            <br />
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    <ProductImage detail={Product}/>
                </Col>
                <Col lg={12} xs={24}>
                    <ProductInfo detail={Product} addToCart={addToCartHandler}/>
                </Col>
            </Row>

        </div>
    );
}

export default withRouter(DetailProductPage);

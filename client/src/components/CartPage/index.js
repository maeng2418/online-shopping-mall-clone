import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCartItems, removeFromCartItem, onSuccessBuy } from 'redux/actions/user_action'
import UserCardBlock from './Sections/UserCardBlock';
import { Result, Empty } from 'antd';
import Axios from 'axios';
import Paypal from 'components/Common/Paypal';

const CartPage = (props) => {

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [Total, setTotal] = useState(0);
  const [ShowTotal, setShowTotal] = useState(false);
  const [ShowSuccess, setShowSuccess] = useState(false);

  useEffect(() => {

    let cartItems = [];
    if (user.userData && user.userData.cart) {
      if (user.userData.cart.length > 0) {
        user.userData.cart.forEach(item => {
          cartItems.push(item.id)
        });
        dispatch(getCartItems(cartItems, user.userData.cart))
      }
    }

  }, [user.userData])

  useEffect(() => {
    if (user.cartDetail && user.cartDetail.length > 0) {
      calculateTotal(user.cartDetail)
    }
  }, [user.cartDetail]);

  const calculateTotal = (cartDetail) => {
    let total = 0;

    cartDetail.map(item => {
      total += parseInt(item.price, 10) * item.quantity
    });

    setTotal(total);
    setShowTotal(true);
  }

  const removeFromCart = (productId) => {

    dispatch(removeFromCartItem(productId))
      .then(() => {

        Axios.get('/api/users/userCartInfo')
          .then(response => {
            if (response.data.success) {
              if (response.data.cartDetail.length <= 0) {
                setShowTotal(false);
              } else {
                calculateTotal(response.data.cartDetail);
              }
            } else {
              alert('Failed to get cart info');
            }
          })
      })
  }

  const transactionSuccess = (data) => {

    dispatch(onSuccessBuy({
        cartDetail: user.cartDetail,
        paymentData: data
    }))
        .then(response => {
            if (response.payload.success) {
                setShowSuccess(true)
                setShowTotal(false)
            }
        })

}

  const transactionError = () => {
    console.log('Paypal error');
  }

  const transactionCanceled = () => {
    console.log('Transaction canceled');
  }

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h1>My Cart</h1>
      <div>

        <UserCardBlock products={user.cartDetail} removeItem={removeFromCart} />

        {ShowTotal ?
          <div style={{ marginTop: '3rem' }}>
            <h2>Total amout: $ {Total}</h2>
          </div>
          :
          ShowSuccess ?
            <Result
              status="success"
              title="Successfully Purchased Items"
            />
            :
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <br />
              <Empty description={false} />
              <p>No Items In the Cart</p>
            </div>
        }

      </div>

      {/* Paypal Button */}
      {ShowTotal &&
        <Paypal
          toPay={Total}
          onSuccess={transactionSuccess}
          transactionError={transactionError}
          transactionCanceled={transactionCanceled}
        />
      }


    </div>
  );
}

export default CartPage;

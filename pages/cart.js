import Image from 'next/image'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from '../redux/reducers/cart.slice'
import HopHelper from './api/helpers'

const CartPage = () => {
  const [loading, setLoading] = useState(false)
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const handlePay = (data) => {
    setLoading(true)
    HopHelper.createCheckOutSession(data)
  }

  return (
    <div className='cart'>
      {cart.length === 0 ? (
        <h1>Your Cart is Empty!</h1>
      ) : (
        <>
          <table className='cart__container'>
            <thead className='cart__header'>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
                <th>Total Price</th>
              </tr>
            </thead>
            {cart.map((item, index) => {
              return (
                <tbody key={index}>
                  <tr className='cart__content'>
                    <td>
                      <Image
                        src={item.images[0].url}
                        height='100'
                        width='100'
                        alt={item.name}
                      />
                    </td>
                    <td>
                      <p>{item.name}</p>
                    </td>
                    <td>
                      <p>{HopHelper.numberFormatter(item.price)}</p>
                    </td>
                    <td>
                      <p>{item.quantity}</p>
                    </td>

                    <td>
                      <button
                        className='cart__action-button'
                        onClick={() => dispatch(decrementQuantity(item.id))}
                      >
                        {' '}
                        -{' '}
                      </button>
                      <button
                        className='cart__action-button'
                        onClick={() => dispatch(incrementQuantity(item.id))}
                      >
                        {' '}
                        +{' '}
                      </button>
                      <button
                        className='cart__action-button'
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        {' '}
                        x{' '}
                      </button>
                    </td>
                    <td>
                      <p>
                        {HopHelper.numberFormatter(item.quantity * item.price)}
                      </p>
                    </td>
                  </tr>
                </tbody>
              )
            })}
          </table>
          <div>
            <h2>
              Grand Total:{' '}
              {HopHelper.numberFormatter(HopHelper.totalPrice(cart))}{' '}
            </h2>
            <button
              className='cart__confirm-order'
              onClick={() => handlePay(cart)}
            >
              {loading ? 'Processing...' : 'Confirm and Pay'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default CartPage

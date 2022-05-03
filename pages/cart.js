import Image from 'next/image'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from '../redux/reducers/cart.slice'
import HopHelper from './api/helpers'
import Button from '../components/Button'
import { useSettingsContext } from '../context/settings'

const CartPage = () => {
  const [loading, setLoading] = useState(false)
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const { activeCurrency } = useSettingsContext()

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
                      <p>
                        {HopHelper.numberFormatter({
                          currency: activeCurrency,
                          value: item.price,
                        })}
                      </p>
                    </td>
                    <td>
                      <p>{item.quantity}</p>
                    </td>

                    <td>
                      <Button
                        className='cart__action-button'
                        onClick={() => dispatch(decrementQuantity(item.id))}
                      >
                        -
                      </Button>
                      <Button
                        className='cart__action-button'
                        onClick={() => dispatch(incrementQuantity(item.id))}
                      >
                        +
                      </Button>
                      <Button
                        className='cart__action-button'
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        x
                      </Button>
                    </td>
                    <td>
                      <p>
                        {HopHelper.numberFormatter({
                          currency: activeCurrency,
                          value: item.quantity * item.price,
                        })}
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
              {HopHelper.numberFormatter({
                currency: activeCurrency,
                value: HopHelper.totalPrice(cart),
              })}
            </h2>
            <Button
              className='cart__confirm-order'
              onClick={() => handlePay(cart)}
            >
              {loading ? 'Processing...' : 'Confirm and Pay'}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default CartPage

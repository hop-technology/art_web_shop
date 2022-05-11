import Image from 'next/image'
import { useState } from 'react'
import { useCart } from 'react-use-cart'
import HopHelper from './api/helpers'
import Button from '../components/ui/Button'
import { useSettingsContext } from '../context/settings'
import { useRouter } from 'next/router'

const CartPage = () => {
  const router = useRouter
  const { cartTotal, isEmpty, items, removeItem, updateItemQuantity } =
    useCart()
  const [loading, setLoading] = useState(false)
  const { activeCurrency } = useSettingsContext()

  const decrementItemQuantity = (item) =>
    updateItemQuantity(item.id, item.quantity - 1)

  const incrementItemQuantity = (item) =>
    updateItemQuantity(item.id, item.quantity + 1)

  const handlePay = (data) => {
    setLoading(true)
    HopHelper.createCheckOutSession(data, router, activeCurrency, cartTotal)
  }

  return (
    <div className='cart'>
      {isEmpty ? (
        <h1>Your Cart is Empty!</h1>
      ) : (
        <>
          <table className='cart__container'>
            <thead className='cart__header'>
              <tr>
                <th>Product</th>
                <th>Size</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
                <th>Total Price</th>
              </tr>
            </thead>
            {items.map((item, index) => {
              return (
                <tbody key={index}>
                  <tr className='cart__content'>
                    <td>
                      <Image
                        src={item.image.url}
                        height='100'
                        width='100'
                        alt={item.name}
                      />
                    </td>
                    <td>
                      <p>{item.size}</p>
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
                        onClick={() => decrementItemQuantity(item)}
                      >
                        -
                      </Button>
                      <Button
                        className='cart__action-button'
                        onClick={() => incrementItemQuantity(item)}
                      >
                        +
                      </Button>
                      <Button
                        className='cart__action-button'
                        onClick={() => removeItem(item.id)}
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
                value: cartTotal,
              })}
            </h2>
            <Button
              className='cart__confirm-order'
              onClick={() => handlePay(items)}
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

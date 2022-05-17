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
        <h1 className='cart__status'>Your Cart is Empty!</h1>
      ) : (
        <>
          <h1 className='cart__status'>Your Cart</h1>
          <div className='cart__divider'></div>
          {items.map((item, index) => {
            return (
              <div key={index} className='item'>
                <div className='item__image'>
                  <Image
                    src={item.image.url}
                    height='100'
                    width='100'
                    alt={item.name}
                  />
                </div>
                <div className='item__info'>
                  <p>{item.size}</p>
                </div>
                <div className='item__quantity'>
                  <Button
                    className='quantity-btn'
                    onClick={() => decrementItemQuantity(item)}>
                    <span className='minus'></span>
                  </Button>
                  <p className='item__quantity--number'>{item.quantity}</p>
                  <Button
                    className='quantity-btn'
                    onClick={() => incrementItemQuantity(item)}>
                    <span className='plus'></span>
                  </Button>
                </div>
                <div className='item__price'>
                  <p>
                    {HopHelper.numberFormatter({
                      currency: activeCurrency,
                      value: item.quantity * item.price,
                    })}
                  </p>
                </div>
                <div className='item__remove'>
                  <Button
                    className='remove-item__btn'
                    onClick={() => removeItem(item.id)}>
                    <span className='cross'></span>
                  </Button>
                </div>
              </div>
            )
          })}
        <div className='cart__summary'>
          <p>
            Grand Total:{' '}
            {HopHelper.numberFormatter({
              currency: activeCurrency,
              value: cartTotal,
            })}
          </p>
          <Button
            className='cart__summary--confirm'
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
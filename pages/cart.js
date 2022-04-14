import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from '../redux/reducers/cart.slice'

const CartPage = () => {
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const getTotalPrice = () => {
    return cart.reduce(
      (accumulator, item) => accumulator + item.quantity * item.price,
      0
    )
  }

  return (
    <div className='cart'>
      {cart.length === 0 ? (
        <h1>Your Cart is Empty!</h1>
      ) : (
        <>
          <table className='cart__container'>
            <thead className='cart__header'>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
              <th>Total Price</th>
            </thead>
            {cart.map((item, index) => {
              return (
                <tbody key={index}  >
                  <tr className='cart__content'>
                    <td>
                      <Image
                        src={item.images[0].url}
                        height='100'
                        width='100'
                      />
                    </td>
                    <td>
                      <p>{item.name}</p>
                    </td>
                    <td>
                      <p>{item.price}</p>
                    </td>
                    <td>
                      <p>{item.quantity}</p>
                    </td>

                    <td>
                      <button
                        onClick={() => dispatch(decrementQuantity(item.id))}
                      >
                        {' '}
                        -{' '}
                      </button>
                      <button
                        onClick={() => dispatch(incrementQuantity(item.id))}
                      >
                        {' '}
                        +{' '}
                      </button>
                      <button onClick={() => dispatch(removeFromCart(item.id))}>
                        {' '}
                        x{' '}
                      </button>
                    </td>
                    <td>
                      <p>{item.quantity * item.price}</p>
                    </td>
                  </tr>
                </tbody>
              )
            })}
          </table>
          <h2>Grand Total: {getTotalPrice()} SEK</h2>
        </>
      )}
    </div>
  )
}

export default CartPage

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import getOrderBySessionId from '../lib/get-order-session-id'

function SuccessPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const fetchOrder = async () => {
      const order = await getOrderBySessionId({ id: router.query.id })
      setLoading(false)
      setOrder(order)
      setSuccess(true)
    }
    if (router.query.id) fetchOrder()
  }, [router.query.id])

  if (loading) return 'loading'

  return success ? (
    <div className='success'>
      <h1 className='success__message'>Thank you for your order!</h1>
      <table className='success__container'>
        <thead className='success__header'>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        {order.order.orderItems.map((item) => {
          return (
            <tbody>
              <tr className='success__content'>
                <td>
                  <Image
                    src={item.product.images[0].url}
                    height='100'
                    width='100'
                  />
                </td>
                <td>
                  <p>{item.product.name}</p>
                </td>
                <td>
                  <p>{item.quantity}</p>
                </td>
                <td>{item.total / 100}</td>
              </tr>
            </tbody>
          )
        })}
      </table>
      <div className='success__information'>
        <h2 className='success__total'>Total Sum: {order.order.total}</h2>
        <h3>
          Please contact us at{' '}
          <a href='artshop@walborgventures.com'>artshop@walborgventures.com</a>{' '}
          or 08-123 56 78 for any questions.
        </h3>
      </div>
    </div>
  ) : (
    'none'
  )
}

export default SuccessPage

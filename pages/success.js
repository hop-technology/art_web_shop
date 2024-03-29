import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useCart } from 'react-use-cart'
import { useSettingsContext } from '../context/settings'
import getOrderBySessionId from '../lib/get-order-session-id'
import HopHelper from './api/helpers'
import SuccessTable from '../components/layout/SuccessTable'

const SuccessPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState(null)
  const [success, setSuccess] = useState(false)
  const { activeCurrency } = useSettingsContext()
  const { emptyCart } = useCart()

  useEffect(() => {
    const { id } = router.query
    const fetchOrder = async () => {
      const order = await getOrderBySessionId({ id: id })
      setLoading(false)
      setOrder(order.order)
      setSuccess(true)
      emptyCart()
    }
    if (router.query.id) fetchOrder()
  }, [router.query.id, router.query, emptyCart])

  if (loading) return 'loading'

  return success ?  (
    <div className='success'>
      <h1 className='success__message'>Thank you for your order!</h1>
      <div className='success__product-information'>
        <div>
          <h2>Delivery details</h2>
          <p>{order.name}</p>
          <p>{order.addressLine1}</p>
          <p>{order.addressLine2 && order.addressLine2 + '\n'}</p>
          <p>
            {order.city}, {order.postalCode}
          </p>
          <p>{order.email}</p>
        </div>
        <SuccessTable order={order} activeCurrency={activeCurrency} />
        <div className='success__information'>
          <h2 className='success__total'>
            Total Sum:
            {HopHelper.numberFormatter({
              currency: activeCurrency,
              value: order.total,
            })}
          </h2>
          <h3>
            Please contact us at&nbsp;
            <a href='artshop@walborgventures.com'>
              artshop@walborgventures.com
            </a>
            or 08-123 56 78 for any questions.
          </h3>
        </div>
      </div>
    </div>
  ) : (
    'none'
  )
}

export default SuccessPage

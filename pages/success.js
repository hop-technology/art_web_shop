import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

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

  return success ? <div>{order.orderItems?.product.name}</div> : 'none'
}

export default SuccessPage

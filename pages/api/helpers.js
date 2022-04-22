import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { errorMessage } from '../../redux/reducers/message.slice'
const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
const stripePromise = loadStripe(publishableKey)

const HopHelper = {
  totalPrice(data) {
    const total = data.reduce((acc, item) => {
      return acc + item.price * item.quantity
    }, 0)
    if (total > 0) {
      return total
    } else {
      return ''
    }
  },

  totalAmount(data) {
    const amount = data.reduce((acc, item) => {
      return acc + item.quantity
    }, 0)
    if (amount > 0) {
      return ` (${amount})`
    } else {
      return ''
    }
  },

  async createCheckOutSession(cart) {
    try {
      const stripe = await stripePromise
      const checkoutSession = await axios.post('/api/create-stripe-session', {
        item: cart,
      })
      const response = stripe.redirectToCheckout({
        sessionId: checkoutSession.data.id,
      })
      return response
    } catch (error) {
      useDispatch(
        errorMessage('Something went wrong, please try again later.')
      )
    }
  },
}

export default HopHelper

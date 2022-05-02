import { loadStripe } from '@stripe/stripe-js'
import store from '../../redux/store/store'
import {
  errorMessage,
  successMessage,
} from '../../redux/reducers/message.slice'
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

  popupStatus(status) {
    if (status === 'success') {
      store.dispatch(successMessage('Payment successful'))
    } else if (status === 'cancel') {
      store.dispatch(errorMessage('Payment unsuccessful'))
    }
  },

  handleShipping(cart) {
    if (this.totalPrice(cart) > 10000) {
      return { shipping_rate: 'shr_1KrM4GL7WvJmM60Hh3sFFJlf' }
    } else {
      return { shipping_rate: 'shr_1KrLXXL7WvJmM60HqbcmyWp4' }
    }
  },

  numberFormatter(currency, value) {
    let formattedNumber = new Intl.NumberFormat('se-SE', {
      style: 'currency',
      currency: currency.code,
    }).format(value / 100)

    return formattedNumber
  },

  async createCheckOutSession(cart) {
    const stripe = await stripePromise
    try {
      const checkoutSession = await fetch('/api/create-stripe-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          cancel_url: window.location.href,
          success_url: `${window.location.origin}/success`,
        }),
      })
      let { session } = await checkoutSession.json()
      await stripe.redirectToCheckout({
        sessionId: session.id,
      })
    } catch (error) {
      store.dispatch(
        errorMessage('Something went wrong, please try again later.')
      )
    }
  },
}

export default HopHelper

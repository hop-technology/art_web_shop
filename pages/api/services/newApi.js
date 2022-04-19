import axios from 'axios'
import HopHelper from './helpers'

const checkoutUrl = 'https://api.playground.klarna.com/checkout/v3/orders'
const config = {
  headers: {
    Authorization: `Basic ${Buffer.from(
      `${process.env.KCO_USERNAME}:${process.env.KCO_PASSWORD}`
    ).toString('base64')}`,
    'Content-Type': 'application/json',
  },
}

const defaultData = {
  purchase_country: 'SE',
  purchase_currency: 'SEK',
  locale: 'en-GB',
  merchant_urls: {
    terms: 'http://localhost:3000/terms',
    checkout: 'http://localhost:3000?order_id={checkout.order.id}',
    confirmation:
      'http://localhost:3000/confirmation?order_id={checkout.order.id}',
    push: 'http://localhost:3000/api/push?order_id={checkout.order.id}',
  },
}

const Order = {
  async create(data) {
    const totalPrice = HopHelper.totalPrice(data)
    debugger

    let orderData = {
      ...defaultData,
      order_amount: totalPrice,
    }
    try {
      response = axios.post(checkoutUrl, orderData, config)
    } catch (error) {
      console.log(error)
    }
  },
}

export default Order

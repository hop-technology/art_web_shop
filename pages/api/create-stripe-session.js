const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
import HopHelper from '../api/helpers'

async function CreateStripeSession(req, res) {
  try {
    const { items, success_url, cancel_url, locale, cartTotal } = req.body

    const stripeItem = items.map((element) => {
      return {
        price_data: {
          currency: 'sek',
          product_data: {
            images: [element.image.url],
            name: element.name,
            metadata: {
              productId: element.id,
            },
          },
          unit_amount: element.price * 100,
        },

        quantity: element.quantity,
        description: element.size,
      }
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'klarna'],
      shipping_address_collection: {
        allowed_countries: ['SE', 'NO'],
      },
      shipping_options: [HopHelper.handleShipping(cartTotal)],
      line_items: stripeItem,
      mode: 'payment',
      locale,
      success_url: `${success_url}?id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${cancel_url}`,
    })

    res.status(201).json({ session })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'There was a problem with creating your order',
    })
  }
}

export default CreateStripeSession

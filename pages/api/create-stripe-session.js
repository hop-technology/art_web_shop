const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
import HopHelper from '../api/helpers'

async function CreateStripeSession(req, res) {
  try {
    const { item } = req.body

    const redirectURL =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/'
        : 'https://art-web-shop.vercel.app/'

    const stripeItem = item.map((element) => {
      return {
        price_data: {
          currency: 'sek',
          product_data: {
            images: [element.images[0].url],
            name: element.slug,
            metadata: {
              productId: element.id,
            }
          },
          unit_amount: element.price * 100,
        },

        quantity: element.quantity,
        description: element.description,
      }
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'klarna'],
      shipping_address_collection: {
        allowed_countries: ['SE', 'NO'],
      },
      shipping_options: [HopHelper.handleShipping(item)],

      line_items: stripeItem,
      mode: 'payment',
      success_url: redirectURL + '?status=success',
      cancel_url: redirectURL + '?status=cancel',
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

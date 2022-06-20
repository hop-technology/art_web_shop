import createOrder from '../../lib/create-order'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
import stripeSigningSecret from '../../lib/stripe-signing-secret'

export const config = {
  api: {
    bodyParser: false,
  },
}

const handler = async (req, res, event) => {
  const permittedEvents = ['checkout.session.completed']

  if (req.method === 'POST') {
    if (permittedEvents.includes(event.type)) {
      try {
        switch (event.type) {
          case 'checkout.session.completed':
            let sessionId = event.data.object.id
            const data = await stripe.checkout.sessions.retrieve(sessionId, {
              expand: ['line_items.data.price.product', 'customer'],
            })
            await createOrder(data)
            break
          default:
            throw new Error(`Unhandled event: ${event.type}`)
        }
      } catch (error) {
        res.status(500).json({ message: 'Unknown event' })
      }
    }

    res.status(200).json({ message: 'Received' })
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}

export default stripeSigningSecret(handler)

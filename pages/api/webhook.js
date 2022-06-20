import axios from 'axios';
import stripeSigningSecret from '../../lib/stripe-signing-secret';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res, event) => {
  const permittedEvents = ['checkout.session.completed'];

  if (req.method === 'POST') {
    if (permittedEvents.includes(event.type)) {
      try {
        switch (event.type) {
          case 'checkout.session.completed':
            let data = await stripe.checkout.sessions.retrieve(sessionId, {
              expand: ['line_items.data.price.product', 'customer'],
            });
            await axios.post('/api/create-order', data);
            break;
          default:
            throw new Error(`Unhandled event: ${event.type}`);
        }
      } catch (error) {
        res.status(500).json({ message: 'Unknown event' });
      }
    }
    return res.status(200).send({ message: 'Received' });
  } else {
    return res.status(405).send({ message: 'Method not allowed' });
  }
};

export default stripeSigningSecret(handler);

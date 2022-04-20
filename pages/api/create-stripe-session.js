const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

async function CreateStripeSession(req, res) {
  const { item } = req.body

  const redirectURL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/'
      : undefined

  const stripeItem = {
    price_data: {
      ...item[0],
      currency: 'sek',
      product_data: {
        name: item.slug,
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
    description: item.description,
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'klarna'],
    line_items: [stripeItem],
    mode: 'payment',
    success_url: redirectURL + '?status=success',
    cancel_url: redirectURL + '?status=cancel',
  })

  res.json({ id: session.id })
}

export default CreateStripeSession

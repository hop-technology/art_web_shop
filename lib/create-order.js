import graphcmsMutationClient, { gql } from './graphcms-mutation-client'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export const createOrderMutation = gql`
  mutation CreateOrderMutation($order: OrderCreateInput!) {
    order: createOrder(data: $order) {
      id
    }
  }
`

async function createOrder({ sessionId }) {
  const { customer, line_items, ...session } =
    await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items.data.price.product', 'customer'],
    })

  return await graphcmsMutationClient.request(createOrderMutation, {
    order: {
      email: customer.email,
      name: customer.name,
      address:
        customer.address.line1 +
        ' ' +
        customer.address.line2 +
        ' ' +
        customer.address.city +
        ' ' +
        customer.address.state +
        ' ' +
        customer.address.postal_code,
      total: session.amount_total / 100,
      stripeCheckoutId: session.id,
      orderItems: {
        create: line_items.data.map((item) => ({
          quantity: item.quantity,
          total: item.amount_total,
          product: {
            connect: {
              id: item.price.product.metadata.productId,
            },
          },
        })),
      },
    },
  })
}

export default createOrder

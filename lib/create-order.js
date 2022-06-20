
import graphcmsMutationClient, { gql } from './graphcms-mutation-client'

export const createOrderMutation = gql`
  mutation createOrderMutation($order: OrderCreateInput!) {
    order: createOrder(data: $order) {
      id
    }
  }
`

async function createOrder(data) {
  console.log(data)

  return await graphcmsMutationClient.request(createOrderMutation, {
    order: {
      email: customer.email,
      name: customer.name,
      addressLine1: customer.shipping.address.line1,
      addressLine2: customer.shipping.address.line2,
      city: customer.shipping.address.city,
      state: customer.shipping.address.state,
      postalCode: customer.shipping.address.postal_code,

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

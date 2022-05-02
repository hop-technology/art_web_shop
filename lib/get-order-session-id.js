import graphcmsClient, { gql } from './graphcms-client'

export const getOrderSessionIdQuery = gql`
  query OrderSessionIdQuery($id: String!) {
    orders(first: 1, stage: DRAFT, where: { stripeCheckoutId: $id }) {
      id
      orderItems {
        id
        product {
          images {
            id
            url
          }
          name
        }
        quantity
        total
      }
      addressLine1
      addressLine2
      city
      state
      postalCode
      email
      name
      total
    }
  }
`

async function getOrderBySessionId({ id }) {
 
  const {
    orders: [order],
  } = await graphcmsClient.request(getOrderSessionIdQuery, {
    id,
  })

  return {
    order,
  }
}

export default getOrderBySessionId
